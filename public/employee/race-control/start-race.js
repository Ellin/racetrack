import { RaceControlView } from '/shared/constants.js';

// Create socket without connecting (only attempt on form submission)
const safetySocket = io("/race-control", { autoConnect: false });
setSocketListeners(safetySocket);
setupKeyForm(safetySocket);

// HTML elements
const startRaceBtn = document.querySelector("#start-race");
const startRaceView = document.body.querySelector('.start-race-view');
const raceModeView = document.body.querySelector('.race-mode-view');
const endSessionView = document.body.querySelector('.end-session-view');

setEventListeners();

function setSocketListeners(socket) {
    socket.on('connect', () => {
        alert("connected");
        document.body.querySelector('.key-form').classList.add('hidden');       
    })

    socket.on('connect_error', (err) => {
        console.log(err.message); // TO DO: Show user friendly error
    })

    socket.on('disconnect', () => {
        alert('disconnected');
        hideControlViews();
    })

    socket.on('initialData', (raceControlView, sessions) => {
        console.log("raceControlView:", raceControlView, "sessions:", sessions);
        displayControlView(raceControlView, sessions);
    })

    socket.on('startRace', () => {
        displayRaceModeView();
    })
}

function setEventListeners() {
    startRaceBtn.addEventListener("click", () => {
        safetySocket.emit('startRace');
    })
}

// displayControlView shows the correct race control interface view
function displayControlView(raceControlView, sessions) {
        hideControlViews();
        
        switch (raceControlView) {
        case RaceControlView.waiting:
            displayNextRaceData(sessions);
            break;
        case RaceControlView.running:
            displayRaceModeView();
            break;
        case RaceControlView.finished:
            console.log('finished');
            endSessionView.classList.remove('hidden');
            break;
        default:
            alert('something went wrong');
    }
}

function hideControlViews() {
    document.body.querySelector('.start-race-view').classList.add('hidden');
    document.body.querySelector('.race-mode-view').classList.add('hidden');
    document.body.querySelector('.end-session-view').classList.add('hidden');
}

// displayNextRaceData constructs and displays the next race view,
// showing the upcoming race data along with a start race button.
function displayNextRaceData(sessions) {
    startRaceView.classList.remove('hidden');
    startRaceView.innerHTML = '';

    if (sessions.length === 0) {
        startRaceView.innerHTML = `<p>No upcoming sessions.</p>`;
        return;
    }

    const session = sessions[0];
    const raceId = session.id; 
    const drivers = [["Mike", 1], ["Tom", 2], ["Emily", 3]] // TODO: Get from session.drivers

    console.log(raceId, drivers);

    const sessionHeader = document.createElement("h2");
    sessionHeader.textContent = `Race #${raceId}`;
    startRaceView.appendChild(sessionHeader);

    const sessionTable = document.createElement("table");
    startRaceView.appendChild(sessionTable);

    // Build and display table of next race data showing the driver names and their car numbers
    drivers.forEach((driver) => {
        const row = document.createElement("tr");
        sessionTable.appendChild(row);

        const driverCell = document.createElement("td");
        driverCell.textContent = driver[0]; // TODO: Use real driver object
        row.appendChild(driverCell);

        const carCell = document.createElement("td");
        carCell.textContent = driver[1]; // TODO: Use real driver object
        row.appendChild(carCell)
    });

    startRaceView.appendChild(startRaceBtn);
}

function displayRaceModeView() {
    raceModeView.classList.remove('hidden');
    
    raceModeView.innerHTML = `
        <h1>Control race modes</h1>
        <button>Safe</button>
        <button>Hazard</button>
        <button>Danger</button>
        <button>Finish</button>`;    
}