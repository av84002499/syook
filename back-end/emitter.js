// emitter.js
const fs = require('fs');
const net = require('net');
const crypto = require('crypto');
const data = require('./data.json');

const server = net.createServer((socket) => {
  console.log('Emitter connected');
  

  const net = require('net');
const server = net.createServer();

server.listen(0, () => {
  const port = server.address().port;
  console.log('Server running on port ' + port);
});


  const interval = setInterval(() => {
    const messages = [];
    const numMessages = Math.floor(Math.random() * (499 - 49) + 49);
    for (let i = 0; i < numMessages; i++) {
      const name = data.names[Math.floor(Math.random() * data.names.length)];
      const origin = data.cities[Math.floor(Math.random() * data.cities.length)];
      const destination = data.cities[Math.floor(Math.random() * data.cities.length)];
      const originalMessage = { name, origin, destination };
      const secret_key = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');
      const sumCheckMessage = { ...originalMessage, secret_key };
      const encryptedMessage = encrypt(JSON.stringify(sumCheckMessage), 'your_secret_key');
      messages.push(encryptedMessage);
    }
    const dataStream = messages.join('|');
    socket.write(dataStream);
  }, 10000);

  socket.on('end', () => {
    clearInterval(interval);
    console.log('Emitter disconnected');
  });
});

server.listen(3000, () => {
    console.log('Emitter server running on port 3000');
  });
  

function encrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-ctr', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}


module.exports = server;
