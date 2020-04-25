const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log('Server has been started...')
  });

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){
        connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
    })

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {message: data.message, userName: data.userName})
    })

});
