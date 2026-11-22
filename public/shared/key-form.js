// Create access key form HTML and handle form submissions
function setupKeyForm(socket) {
    const formHTML = `
    <form class="key-form">
        <label for="access-key">Access key</label>
        <input type="password" id="access-key">
        <button>Submit</button>
    </form>`;

    document.body.insertAdjacentHTML('afterbegin', formHTML);

    const keyForm = document.querySelector('.key-form');

    // On form submission, attempt to establish connection using the access key
    keyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyValue = keyForm.querySelector('#access-key').value;
        socket.auth = { key: keyValue };
        socket.connect(); // Attempt connection
    });
}
