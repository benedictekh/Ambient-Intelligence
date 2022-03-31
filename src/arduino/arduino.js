const { Board, Led } = require("johnny-five");

const board = new Board({ port: "COM5" });

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
