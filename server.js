import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import publicRouter from './routes/public-routes.js';
import privateRouter from './routes/private-routes.js';

const app = express(); 
const server = createServer(app); // Create a Node.js HTTP server that uses the Express app to handle HTT
const io = new Server(server); // io is the Socket.IO server, which manages ALL client connections (whereas socket represents one individual client's connection)

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Serve static files from the 'private' folder
app.use(express.static('private')); //TODO: Add authentication middleware

// Routers
app.use('/', publicRouter);
app.use('/', privateRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

