// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
