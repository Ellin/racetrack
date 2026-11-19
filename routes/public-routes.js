import express from 'express';
import path from 'node:path';

const router = express.Router();

// Get absolute path of public directory
const publicDir = path.resolve(import.meta.dirname, "../public");

// Race Flags
router.get('/race-flags', (req, res) => {
    // TODO: Handle route
    console.log("/race-flags");
});

export default router;