// listener.js
const net = require('net');
const crypto = require('crypto');
const mongoose = require('mongoose');
const data = require('./data.json');


mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const server = net.createServer((socket) => {
  console.log('Listener connected');

  socket.on('data', (dataStream) => {
    const messages = dataStream.toString().split('|');
    messages.forEach((message) => {
      const decryptedMessage = decrypt(message, 'your_secret_key');
      const obj = JSON.parse(decryptedMessage);
      const { name, origin, destination, secret_key } = obj;

      const calculatedSecretKey = crypto.createHash('sha256').update(JSON.stringify({ name, origin, destination })).digest('hex');
      if (secret_key === calculatedSecretKey) {
        const timestamp = new Date().getTime();
        const minute = Math.floor(timestamp / 60000);
        const collectionName = `data_${minute}`;
        const DataModel = db.model(collectionName, { name: String, origin: String, destination: String, timestamp: Number });
        const newData = new DataModel({ name, origin, destination, timestamp });
        newData.save();
      } else {
        console.log('Data integrity compromised. Discarding operation.');
      }
    });
  });

  socket.on('end', () => {
    console.log('Listener disconnected');
  });
});

server.listen(3000, () => {
    console.log('Listener server running on port 3000');
  });

function decrypt(text, key) {
  const decipher = crypto.createDecipher('aes-256-ctr', key);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = server;
