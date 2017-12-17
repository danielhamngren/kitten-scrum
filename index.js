var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var state = {};

io.on('connection', function(socket){
  socket.on('position', function(msg){
    state[msg.kittenId] =msg;
    io.emit('state', state);
    console.log(msg);
    console.log(state);
  });
});

http.listen(PORT,  () => {
      console.log('listening on ' + PORT);
});
