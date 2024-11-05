const socket = io();
let username;

// Show the password prompt and wait for authentication
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    username = document.getElementById('username').value; // Get username input

    // Emit authentication event to the server
    socket.emit('authenticate', password, username);
});

// Listen for authentication response
socket.on('authenticated', function(username) {
    document.getElementById('popup').style.display = 'none'; // Hide password popup
    document.getElementById('chat').style.display = 'block'; // Show chat interface
});

// Handle unauthorized access
socket.on('unauthorized', function() {
    alert('Incorrect password! Cannot try again.');
    document.getElementById('password').value = ''; // Clear password field
});

// Send message to server
document.getElementById('send').addEventListener('click', function() {
    const message = document.getElementById('message').value;

    if (username && message) {
        const data = { username, message };
        socket.emit('sendMessage', data); // Send message to server
        document.getElementById('message').value = ''; // Clear input
    }
});

// Receive messages from the server
socket.on('receiveMessage', function(data) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
});
