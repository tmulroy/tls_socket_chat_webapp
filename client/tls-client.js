'use strict';

const tls = require('tls'),
      fs = require('fs'),
      port = 443,
      hostname = 'localhost',
      ipVersion = 6;

const options = {
  port: port,
  host: hostname,
  family: ipVersion,
  key: fs.readFileSync('./certificate/client.key'),
  cert: fs.readFileSync('./certificate/client.crt'),
  ca: fs.readFileSync('../certificate_authority/ca.crt')
};

const socket = tls.connect(options, () => {
  console.log('\nclient connected',
              socket.authorized ? 'is authorized' : 'is unauthorized');
  // redirect stdin to the socket (allows user to type in shell)
  process.stdin.pipe(socket);
  process.stdin.resume();
  console.log(`\nAddress: ${socket.address().address}`);
  console.log(`Port: ${socket.address().port}`);
  console.log(`Family: ${socket.address().family}\n`);
});

socket.setEncoding('utf8');

// need to fix, if client writes to socket, it outputs to client stdout

socket.on('data', (data) => {
  console.log(`Server: ${data}`);
});

socket.on('error', (err) => {
  console.log(`Error: ${err}`);
});

socket.on('end', () => {
  console.log("End connection");
});
