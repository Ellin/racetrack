// Create socket without connecting (only attempt on form submission)
const frontDeskSocket = io("/front-desk", { autoConnect: false });
setSocketListeners(frontDeskSocket);
setupKeyForm(frontDeskSocket);

let sessions = []
let drivers = []
let selectedRaceId = 0
let driverId = 1
const maxDriversPerSession = 8

function setSocketListeners(socket) {
  socket.on('connect', () => {
    alert("connected");
    document.body.querySelector('.key-form').classList.add('hidden');
    document.body.querySelector('.front-desk-view').classList.remove('hidden');
  })

  socket.on('connect_error', (err) => {
    console.log(err.message);
    return
  })
  socket.on('updateSessions', (updatedSessions) => {
    sessions = updatedSessions
    displaySessions()
  })
}

const driverName = document.querySelector("#driver-name")
const saveDriver = document.querySelector("#save-driver")
const driverList = document.querySelector("#driver-list")

const createSessionButton = document.querySelector("#create-race")
const raceList = document.querySelector("#race-list")
const selectedRace = document.querySelector("#selected-race-name")


const editRaceButton = document.querySelector("#edit-race")
const editRaceForm = document.querySelector("#edit-race-form")
const chooseDriver = document.querySelector("#choose-driver")
const chooseCar = document.querySelector("#choose-car")

const addToRace = document.querySelector("#add-to-race")
const raceDrivers = document.querySelector("#race-drivers")
const deleteRaceButton = document.querySelector("#delete-race")

createCarsOption()
setUpEventListeners()

function setUpEventListeners() {
  saveDriver.addEventListener("click", saveDriverName)
  createSessionButton.addEventListener("click", createSession)
  deleteRaceButton.addEventListener("click", deleteSession)
  editRaceButton.addEventListener("click", editRace)
  addToRace.addEventListener("click", addDriverDetailToSession)
}
function createCarsOption() {
  for (let carId = 1; carId <= maxDriversPerSession; carId++) {
    const option = document.createElement("option")
    option.value = carId
    option.textContent = `Car ${carId}`
    chooseCar.appendChild(option)
  }
}

function saveDriverName() {
  const name = driverName.value.trim()
  if (name === "") {
    alert("Enter a name")
    return
  }
  if (driverNameExists(drivers, name)) {
    alert("Name already exists")
    return
  }
  const newDriver = { id: driverId, name: name }
  drivers.push(newDriver)
  driverId++

  displayDriverNames(newDriver)
  driverName.value = ""
}

function displayDriverNames(newDriver) {
  const option = document.createElement("option")
  option.value = newDriver.id
  option.textContent = newDriver.name
  chooseDriver.appendChild(option)

  const eachDriver = document.createElement("div")
  const driverText = document.createElement("span")
  const deleteButton = document.createElement("button")
  const editButton = document.createElement("button")

  driverText.textContent = newDriver.name
  deleteButton.textContent = "Delete"
  editButton.textContent = "Edit"
  eachDriver.appendChild(driverText)
  eachDriver.appendChild(editButton)
  eachDriver.appendChild(deleteButton)
  driverList.appendChild(eachDriver)

  editButton.addEventListener("click", () => editName(option, driverText, newDriver))
  deleteButton.addEventListener("click", () => deleteName(option, eachDriver, newDriver))
}

function displayRaceDetail() {
  raceDrivers.textContent = ""
  const session = sessions.find((session) => {
    return session.id === selectedRaceId
  })
  if (!session) {
    return
  }
  session.drivers.forEach((input) => {
    const driver = drivers.find((driver) => {
      return driver.id === input.driverId
    })
    if (!driver) {
      return
    }
    const raceDetailText = document.createElement("p")
    raceDetailText.textContent = `${driver.name} - Car ${input.car}`
    raceDrivers.append(raceDetailText)
  })
}

function editName(option, driverText, newDriver) {
  const name = prompt("Enter new name", newDriver.name)
  if (name === null) {
    return
  }
  const newName = name.trim()
  if (newName === "") {
    alert("Enter a name")
    return
  }
  if (newDriver.name.toLowerCase() !== newName.toLowerCase() && driverNameExists(drivers, name)) {
    alert("Name already exists")
    return
  }
  newDriver.name = name
  driverText.textContent = newName
  option.textContent = newName
  displayRaceDetail()
}

function deleteName(option, eachDriver, newDriver) {
  drivers = drivers.filter((driver) => {
    return driver.id !== newDriver.id
  })

  sessions.forEach((session) => {
    session.drivers = session.drivers.filter((driver) => {
      return driver.driverId !== newDriver.id
    })
  })
  eachDriver.remove()
  option.remove()
  displayRaceDetail()
}

function createSession() {
  frontDeskSocket.emit("sessionCreate")
}

function displaySessions() {
  raceList.textContent = ""
  sessions.forEach((session) => {
    const raceButton = document.createElement("button")
    raceButton.textContent = `Race ${session.id}`
    raceButton.id = `race-${session.id}`
    raceList.appendChild(raceButton)
    raceButton.addEventListener("click", () => selectRace(session))
  })
}

function selectRace(newRace) {
  selectedRaceId = newRace.id
  selectedRace.textContent = `Race ${newRace.id}`
  editRaceForm.hidden = true
  displayRaceDetail()
}

function editRace() {
  if (selectedRaceId === 0) {
    alert("select a race")
    return
  }
  editRaceForm.hidden = false
}

function deleteSession() {
  if (selectedRaceId === 0) {
    alert("Select a Race")
    return
  }

  sessions = sessions.filter((session) => {
    return session.id !== selectedRaceId
  })

  const raceButton = document.querySelector(`#race-${selectedRaceId}`)
  raceButton.remove()

  selectedRace.textContent = "Nothing selected"
  selectedRaceId = 0
  if (sessions.length === 0) {
    raceId = 1
  }
  editRaceForm.hidden = true
  displayRaceDetail()
}

const driverNameExists = (arr, name) => {
  for (const obj of arr) {
    if (obj.name.toLowerCase() === name.toLowerCase()) {
      return true
    }
  }
  return false
}

function addDriverDetailToSession() {
  const session = sessions.find((session) => {
    return session.id === selectedRaceId
  })

  if (!session) {
    alert("Choose a Race")
    return
  }

  if (chooseDriver.value === "" || chooseCar.value === "") {
    alert("Choose a driver and Car")
    return
  }
  const id = Number(chooseDriver.value)
  const car = Number(chooseCar.value)

  if (session.drivers.length >= maxDriversPerSession) {
    alert("Maximum 8 drivers allowed")
    return
  }
  const driverExists = session.drivers.some((driver) => {
    return driver.driverId === id
  })
  if (driverExists) {
    alert("Driver already assigned")
    return
  }
  const carExists = session.drivers.some((driver) => {
    return driver.car === car
  })
  if (carExists) {
    alert("Car already assigned")
    return
  }
  session.drivers.push({ driverId: id, car: car })
  chooseDriver.value = ""
  chooseCar.value = ""
  displayRaceDetail()
}
