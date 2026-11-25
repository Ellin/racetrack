// This file holds constants shared between client- and server-side js.
// Do not use browser or Node.js specific APIs.

export const RaceStatus = Object.freeze({
    waiting: 'waiting', // Waiting for next race session to start
    running: 'running', // Race has started and is in progress
    finished: 'finished', // Race is in finish mode, but the session has not ended
});