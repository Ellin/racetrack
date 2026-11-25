import { RaceStatus } from '/shared/constants.js';

// Create socket without connecting (only attempt on form submission)
const safetySocket = io("/race-control", { autoConnect: false });
setSocketListeners(safetySocket);
setupKeyForm(safetySocket);

// HTML elements
const startRaceBtn = document.querySelector("#start-race");

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

    socket.on('initialData', (raceStatus, sessions) => {
        displayControlView(raceStatus, sessions);
    })
}

function setEventListeners() {
    startRaceBtn.addEventListener("click", () => {
        safetySocket.emit('startRace');
    })
}

// displayControlView shows the race control interface view according to the race status
function displayControlView(raceStatus, sessions) {
        switch (raceStatus) {
        case RaceStatus.running:
            console.log('running');
            document.body.querySelector('.race-mode-view').classList.remove('hidden');
            break;
        case RaceStatus.finished:
            console.log('finished');
            document.body.querySelector('.end-session-view').classList.remove('hidden');
            break;
        case RaceStatus.waiting:
            console.log('waiting', sessions); 
            document.body.querySelector('.start-race-view').classList.remove('hidden');
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