var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

var port = 8081;
var io = require('socket.io').listen(app.listen(port));

var _socket;

io.sockets.on('connection', function (socket) {
  socket.emit('message', {
    msg: "connected bitch"
  });
  _socket = socket;
});

app.listen(80, function () {
  console.log('IoT Server listening on port 80!');
});

app.get('/rotate/:value', function(req, res) {
  // todo: send rotate value to rasp
  _socket.emit('rotate', {angle: res.value});
  res.end('rotated');
});
