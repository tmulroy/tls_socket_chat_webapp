'use strict';

const port = 443;
const hostname = 'localhost';

const tls = require('tls');
const fs = require('fs');

const options = {
  port: port,
  host: hostname,
  readable: true,
  writable: true,
  key: fs.readFileSync('./certificate/client.key'),
  cert: fs.readFileSync('./certificate/client.crt'),
  ca: fs.readFileSync('../certificate_authority/ca.crt')
};

const socket = tls.connect(options, () => {
  console.log('\nclient connected',
              socket.authorized ? 'is authorized' : 'is unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();
  process.stdout
  console.log(`\nAddress: ${socket.address().address}`);
  console.log(`Port: ${socket.address().port}`);
  console.log(`Family: ${socket.address().family}\n`);
});

socket.setEncoding('utf8');

socket.on('data', (data) => {
  console.log(data);
});

socket.on('end', () => {
  console.log("End connection");
});
