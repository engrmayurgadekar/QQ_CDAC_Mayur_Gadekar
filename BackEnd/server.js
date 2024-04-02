const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = {};
let nextUserId = 1;
let recipients = {};
let messageCounts = {};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    if (data.type === 'register') {
      const username = data.username;
      clients[username] = { id: nextUserId++, ws };
      ws.send(JSON.stringify({ type: 'registered' }));
      updateRecipients();
      // Initialize message count for the user
      messageCounts[username] = 0;
    } else if (data.type === 'message' && clients[data.to]) {
      clients[data.to].ws.send(JSON.stringify({ type: 'message', from: data.from, content: data.content }));
      // Increment message count for the recipient
      messageCounts[data.to] = (messageCounts[data.to] || 0) + 1;
    }
  });

  ws.on('close', function close() {
    for (const [username, client] of Object.entries(clients)) {
      if (client.ws === ws) {
        delete clients[username];
        updateRecipients();
        // Remove message count for the user
        delete messageCounts[username];
        break;
      }
    }
  });

  const updateRecipients = () => {
    recipients = Object.keys(clients);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'recipients', recipients }));
      }
    });
  };
});

server.listen(8080, function() {
  console.log('Server started on http://localhost:8080');
});