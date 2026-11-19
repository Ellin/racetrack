import express from 'express';
import path from 'node:path';

const router = express.Router();

// Get absolute path of private directory
const privateDir = path.resolve(import.meta.dirname, "../private");

// Race Control
router.get('/race-control', (req, res) => {
    res.sendFile(path.join(privateDir, 'race-control/start-race.html'));
});

export default router;