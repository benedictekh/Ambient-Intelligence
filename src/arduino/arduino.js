/*import React from "react";
import ReactDOM from "react-dom";
import five from "johnny-five";
*/
/*var board = new five.Board({
  port: "COM5",
});

board.on("ready", function () {
  var led = new five.Led(13);
  led.blink(500);
});*/

// https://stackoverflow.com/questions/46994530/use-johnny-five-with-react

//import SerialPort from "serialport";

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const port = new SerialPort({
  path: "COM5",
  baudRate: 9600,
  //parser: new Readline({ delimeter: "\n" }),
});
//Port_#0001.Hub_#0001
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
// Read the port data

console.log("hellllooooo");
port.on("open", () => {
  console.log("serial port open");
});
parser.on("data", (data) => {
  console.log("got word from arduino:", data);
});
