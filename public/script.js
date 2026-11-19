let driver = { name: undefined, car: undefined }
let sessions = []
const createSessionButton = document.querySelector("#create-race")
const raceList = document.querySelector("#race-list")
const selectedRace = document.querySelector("#selected-race")
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
    selectedRace.textContent = `Race ${newRace.id}`
  })
})
