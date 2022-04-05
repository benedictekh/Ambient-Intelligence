import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';


export default function ClientComponent() {

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  // const [socket, setSocket] = useState(null);

  const socket = socketIOClient("http://localhost:4001");

  useEffect(() => {
    
    socket.on("connect", () => {
      console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    });
    // setSocket(socketIOClient(ENDPOINT));

    socket.emit('start');
  }, []);


  const changeToRed = (on) => {
    console.log("red")
    socket.emit('turnOnRed');

    // const socket = socketIOClient(ENDPOINT);

    if(on) {
      socket.emit('turnOnRed');
    }
    else {
      socket.emit('turnOffRed');
    }
  }

  return (
    <div className="grid">
        <button onClick={() => changeToRed(true)}>Turn on Red</button>
        <button onClick={() => changeToRed(false)}>Turn off Red</button>
      </div>

  );
}