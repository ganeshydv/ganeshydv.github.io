const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the HTML file for the client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Array to store connected clients
const clients = new Set();

// Event handler for incoming connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Add the new client to the set
  clients.add(ws);

  // Event handler for incoming messages
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Event handler for connection termination
  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove the client from the set
    clients.delete(ws);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
