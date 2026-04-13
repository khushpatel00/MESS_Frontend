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
    console.log('connected with: ', socket.id)
    socket.broadcast.emit('user-connected', { id: socket.id });
    socket.on('send-devinfo', (data) => {
        console.log(data);
    })
    socket.on('send-message', (data) => {
        console.log(data);
        socket.broadcast.emit('recieve-new-message', data);
    });
    socket.on('disconnect', (reas) => {
        console.log(`disconnected to: ${socket.id} ${reas} `)
        socket.broadcast.emit('user-left', { id: socket.id });
    })
});

socketServer.listen(8080, () => {
    console.log('listening on port 8080');
})
