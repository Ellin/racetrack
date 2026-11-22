// Create socket without connecting (only attempt on form submission)
const safetySocket = io("/race-control", { autoConnect: false });
setSocketListeners(safetySocket);
setupKeyForm(safetySocket);

function setSocketListeners(socket) {
    socket.on('connect', () => {
        alert("connected");
        document.body.querySelector('.key-form').classList.add('hidden');
        document.body.querySelector('.start-race-view').classList.remove('hidden');
    })

    socket.on('connect_error', (err) => {
        alert(err.message);
    })
}