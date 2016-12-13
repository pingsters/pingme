var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

var curR = 90;
var servo;

board.on("ready", function() {
  servo = new five.Servo({
    pin: 'P1-12',
    startAt: curR
  });
});

var socket = io.connect('https://34.194.224.78:8081');

socket.on('message', function (data) {
  console.log(data.msg);
});

socket.on('rotate', function (data) {
  console.log(data);
  servo.to(data.angle);
});
