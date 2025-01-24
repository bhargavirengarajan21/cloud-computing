const net = require('net');
const fs = require('fs');

const PORT = 8080;
const SERVER_IP = '172.17.34.1'; // Replace with the IP address of VM0

// Create a socket to connect to the server
const client = net.createConnection({ port: PORT, host: SERVER_IP }, () => {
    console.log('Connected to server.');

    // Open a writable stream to save the received file
    const fileStream = fs.createWriteStream('mydata_client_copy.txt');

    // Pipe the socket data into the writable stream
    client.pipe(fileStream);

    fileStream.on('finish', () => {
        console.log('File received and saved as mydata_client_copy.txt');
        client.end();
    });
});

client.on('error', (err) => {
    console.error('Connection error:', err.message);
});

client.on('end', () => {
    console.log('Disconnected from server.');
});

