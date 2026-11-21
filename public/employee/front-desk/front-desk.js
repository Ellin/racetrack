// let driver = { name: undefined, car: undefined }
let sessions = []
const createSessionButton = document.querySelector("#create-race")
const raceList = document.querySelector("#race-list")
const selectedRace = document.querySelector("#selected-race-name")
let selectedRaceId = 0
let i = 1

createSessionButton.addEventListener("click", () => {

  const newRace = { id: i, drivers: [] }
  sessions.push(newRace)
  i++

  // console.log("created a race", newRace)
  // console.log("all sessions", sessions)

  const raceButton = document.createElement("button")
  raceButton.textContent = `Race ${newRace.id}`
  raceButton.id = `race-${newRace.id}`
  raceList.appendChild(raceButton)

  raceButton.addEventListener("click", () => {
    selectedRaceId = newRace.id
    selectedRace.textContent = `Race ${newRace.id}`
    editRaceForm.hidden = true
  })
})

const deleteRaceButton = document.querySelector("#delete-race")
deleteRaceButton.addEventListener("click", () => {
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
    i = 1
  }

})

let drivers = []
let driverId = 1

const driverName = document.querySelector("#driver-name")
const saveDriver = document.querySelector("#save-driver")
const driverList = document.querySelector("#driver-list")

saveDriver.addEventListener("click", () => {
  const name = driverName.value.trim()
  if (name === "") {
    alert("Enter a name")
    return
  }
  if (duplicatName(drivers, name)) {
    alert("Name already exists")
    return
  }
  const newDriver = { id: driverId, name: name }
  drivers.push(newDriver)
  driverId++

  const option = document.createElement("option")
  option.value = newDriver.id
  option.textContent = newDriver.name
  chooseDriver.appendChild(option)

  // console.log("all drivers:", drivers)

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

  editButton.addEventListener("click", () => {
    const name = prompt("Enter new name", newDriver.name)
    if (name === null) {
      return
    }
    const newName = name.trim()
    if (newName === "") {
      alert("Enter a name")
      return
    }
    if (duplicatName(drivers, name)) {
      alert("Name already exists")
      return
    }
    newDriver.name = name
    driverText.textContent = newName
    option.textContent = newName
  })
  driverName.value = ""
  deleteButton.addEventListener("click", () => {
    drivers = drivers.filter((driver) => {
      return driver.id !== newDriver.id
    })

    eachDriver.remove()
    option.remove()
  })

})

const duplicatName = (arr, name) => {
  for (const obj of arr) {
    if (obj.name.toLowerCase() === name.toLowerCase()) {
      return true
    }
  }
  return false
}

const editRaceButton = document.querySelector("#edit-race")
const editRaceForm = document.querySelector("#edit-race-form")
const chooseDriver = document.querySelector("#choose-driver")
const chooseCar = document.querySelector("#choose-car")

for (let j = 1; j <= 8; j++) {
  const option = document.createElement("option")
  option.value = j
  option.textContent = `Car ${j}`
  chooseCar.appendChild(option)
}

editRaceButton.addEventListener("click", () => {
  if (selectedRaceId === 0) {
    alert("select a race")
    return
  }

  editRaceForm.hidden = false

})
