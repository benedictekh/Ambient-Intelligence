// const { StrictEventEmitter } = require('socket.io/dist/typed-events');

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();
const port = process.env["PORT"];
const local = process.env["CORSLOCAL"];

const index = require("./routes/index");
const app = express();

const events = require("events");

const eventEmitter = new events.EventEmitter();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // You may need to change this in .ENV if the client starts on a different port.
    origin: local,
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 1e8,
});

// const five = require('johnny-five');
// const board = new five.Board();

// let interval;

io.on("connection", (socket) => {
  console.log("start" + socket.id);
  const id = socket.handshake.query.id;
  socket.join(id);

  // if(interval) {
  //     clearInterval(interval);
  // }

  // interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("start", (arg) => {
    console.log("start", arg);

    // eventEmitter.emit('toggleLED');
    // const red = new Led(13);

    // handleLedChange(red)
  });

  socket.on("turnOnRed", (arg) => {
    console.log("turnOnRed", arg);
    const red = new Led(9);
    handleLedChange(red);
  });

  socket.on("turnOffRed", (arg) => {
    console.log("turnOffRed", arg);
    const red = new Led(9);
    red.off();
    console.log('red is off')
  });

  socket.on("turnOnBlue", (arg) => {
    console.log("turnOnBlue", arg);
    const blue = new Led(13);
    handleLedChange(blue);
  });

  socket.on("turnOffBlue", (arg) => {
    console.log("turnOffBlue", arg);
    const blue = new Led(13);
    blue.off();
  });

  socket.on("turnOnYellow", (arg) => {
    console.log("turnOnYellow", arg);
    const yellow = new Led(4);
    handleLedChange(yellow);
  });

  socket.on("turnOffYellow", (arg) => {
    console.log("turnOffYellow", arg);
    const yellow = new Led(4);
    yellow.off();
  });

  socket.on("turnOnServo", (arg) => {
    console.log("turnOnServo");
    const servo = new Servo(2);
    servo.sweep();
  });

  // socket.on('changeToBlue', (arg) => {
  //     console.log("changeToBlue", arg);
  //     const blue = new Led(13);
  //     handleLedChange(blue)
  // });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
    socket.off();
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const { Board, Led, Servo } = require("johnny-five");
const { SerialPort } = require("serialport");

const board = new Board({ port: "COM6" });

board.on("open", () => {
  console.log("serial port open");
});

board.on("ready", () => {
  console.log("hello");
  // const red = new Led(9);
  // const yellow = new Led(4);
  // const blue = new Led(13);
  // // const servo = new Servo(7);
  // const ledModes = [red, yellow, blue];
  // // servo.sweep();
  // handleLedChange(ledModes[1]);
});

function handleLedChange(mode) {
  // console.log(mode);
  mode.on(500);
}
