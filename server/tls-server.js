'use strict';

const tls = require('tls');
const fs = require('fs');
const port = 443;

const options = {
    key: fs.readFileSync('./certificate/server.key'),
    cert: fs.readFileSync('./certificate/server.crt'),
    ca: fs.readFileSync('../certificate_authority/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

let server = tls.createServer(options, (socket) => {
  socket.write('Server: welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
  // redirect stdin to the socket (allows user to type in shell)
  process.stdin.pipe(socket);
  console.log(`Cipher Suite: ${socket.getCipher().name}`);
  console.log(`Protocol: ${socket.getProtocol()}`);
});


server.on('secureConnection', (socket) => {
	console.log('secure connection; client authorized: ', socket.authorized);
  socket.on('data', (data) => {
    console.log(`Client: ${data}`)
  });
});


server.listen(port, () => {
	console.log(`Server listening on port ${port} \n`);
});
