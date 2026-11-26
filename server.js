import { keys } from "./config.js" // Runs config.js, checking if access keys were set
import { requireKey } from "./middleware/authenticate.js"
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import router from './routes/routes.js';
import { RaceControlView, RaceMode } from "./shared/constants.js";

const app = express();
const server = createServer(app); // Create a Node.js HTTP server that uses the Express app to handle HTT
const io = new Server(server); // io is the Socket.IO server, which manages ALL client connections (whereas socket represents one individual client's connection)

const safetyNamespace = io.of("/race-control");
const receptionistNamespace = io.of("/front-desk");

// State data
let sessions = []
let raceId = 1
let raceControlView = RaceControlView.waiting;
let raceMode = RaceMode.danger;

// Use authentication middleware
safetyNamespace.use(requireKey(keys.safety));
receptionistNamespace.use(requireKey(keys.receptionist));

safetyNamespace.on('connection', (socket) => {
    socket.emit('initialData', raceControlView, sessions);
    socket.on('startRace', () => {
        raceControlView = RaceControlView.running;
        raceMode = RaceMode.safe;
        socket.emit('startRace');

        // TODO: Emit 'changeRaceMode' event 
    })
})

receptionistNamespace.on("connection", (receptionistSocket) => {
    receptionistSocket.emit("updateSessions", sessions)
    receptionistSocket.on("sessionCreate", () => {
        const newRace = { id: raceId, drivers: [] }
        sessions.push(newRace)
        raceId++
        // console.log("receptionist requested a race", newRace)
        receptionistSocket.emit("updateSessions", sessions)
    })
})

// Serve static files from these folders:
app.use(express.static('public'));
app.use('/shared', express.static('shared'));

// Routers
app.use('/', router);

// Start the server
server.listen(3000, () => {
    console.log('Server started on port 3000');
});
