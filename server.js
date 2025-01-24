const net = require('net');
const fs = require('fs');

const PORT = 8080;

// Create the server
const server = net.createServer((socket) => {
    console.log('Client connected.');

    // Open the file to read
    const fileStream = fs.createReadStream('mydata.txt');

    // Pipe the file stream to the socket
    fileStream.pipe(socket);

    fileStream.on('end', () => {
        console.log('File sent successfully.');
        socket.end();
    });

    socket.on('close', () => {
        console.log('Connection closed.');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

