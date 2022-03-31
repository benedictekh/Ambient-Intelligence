const { Board, Led } = require("johnny-five");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const board = new Board({ port: "COM5" });

//const ledModes = [red, yellow, blue];

board.on("open", () => {
  console.log("serial port open");
});

board.on("ready", () => {
  console.log("hello");
  const red = new Led(9);
  const yellow = new Led(4);
  const blue = new Led(13);

  const ledModes = [red, yellow, blue];

  handleLedChange(ledModes[1]);
});

function handleLedChange(mode) {
  console.log(mode);
  mode.on(500);
}

//handleLedChange(0);

/*const port = new SerialPort({
  path: "COM5",
  baudRate: 9600,
  //parser: new Readline({ delimeter: "\n" }),
});*/
//Port_#0001.Hub_#0001

//const parser = board.pipe(new ReadlineParser({ delimiter: "\n" }));
// Read the port data

/*parser.on("data", (data) => {
  console.log("got word from arduino:", data);
});*/
