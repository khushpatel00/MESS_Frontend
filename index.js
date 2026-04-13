const express = require('express');
const server = express();
const socketio = require('socket.io');
const socketServer = require('http').createServer(server);
const io = socketio(socketServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('send-devinfo', (data) => {
        console.log(data)
    })
    socket.on('send-message', (data) => {
        io.emit('recieve-new-message', data);
    })
})

socketServer.listen(8080, () => {
    console.log('listening on port 8080');
})