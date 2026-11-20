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
  })
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
  console.log("all drivers:", drivers)
  const eachDriver = document.createElement("p")
  eachDriver.textContent = newDriver.name
  driverList.appendChild(eachDriver)
  driverName.value = ""
})

const duplicatName = (arr, name) => {
  for (const obj of arr) {
    if (obj.name.toLowerCase() === name.toLowerCase()) {
      return true
    }
  }
  return false
}
