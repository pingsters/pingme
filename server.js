var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
var _socket;
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/rotate/:value', function (req, res) {
  _socket.emit('rotate', {angle: req.params.value});
  res.end("bitch" + req.params.value);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  _socket = socket;
});
