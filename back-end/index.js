const http = require('http'); // Import the HTTP module

const emitterPort = 3000; // Change the port number
const listenerPort = 3000;

const emitterServer = http.createServer((req, res) => {
  // Handle requests for the emitter server
  res.end('Emitter server response');
});

const listenerServer = http.createServer((req, res) => {
  // Handle requests for the listener server
  res.end('Listener server response');
});

emitterServer.listen(emitterPort, () => {
  console.log(`Emitter server running on port ${emitterPort}`);
});

listenerServer.listen(listenerPort, () => {
  console.log(`Listener server running on port ${listenerPort}`);
});
