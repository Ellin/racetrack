import express from 'express';
import path from 'node:path';

const router = express.Router();

// Get absolute path of public directory
const publicDir = path.resolve(import.meta.dirname, "../public");

// Front-desk
router.get('/front-desk', (req, res) => {
    res.sendFile(path.join(publicDir, 'employee/front-desk/front-desk.html'));
});

// Race Control
router.get('/race-control', (req, res) => {
    res.sendFile(path.join(publicDir, 'employee/race-control/start-race.html'));
});

// Race Flags
router.get('/race-flags', (req, res) => {
    // TODO: Handle route
    console.log("/race-flags");
});

export default router;
