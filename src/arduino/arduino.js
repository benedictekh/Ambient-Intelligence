const { Board, Led, Servo } = require("johnny-five");
//const { SerialPort } = require("serialport");

const board = new Board({ port: "COM5" });

board.on("open", () => {
  console.log("serial port open");
});

board.on("ready", () => {
  console.log("hello");
  const red = new Led(9);
  const yellow = new Led(4);
  const blue = new Led(13);
  //const servo = new Servo(7);
  const ledModes = [red, yellow, blue];
  //servo.sweep();
  handleLedChange(ledModes[1]);
});

function handleLedChange(mode) {
  console.log(mode);
  mode.on(500);
}
