import socketIOClient from "socket.io-client";
import "../../src/index.css";
import { TakePhoto } from "../components/TakePhoto";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "../components/takePhoto.css"

export default function DefaultView() {
  const socket = socketIOClient("http://localhost:4001");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); 
      socket.emit("turnOffRed");
      socket.emit("turnOffBlue");
      socket.emit("turnOffYellow");
    });
  }, []);
  
  return (
    <div className="formDiv">
      <h2 className="header">Welcome!</h2> 
      <h2 className="header">Take a picture or register as a new user</h2> 
      <TakePhoto></TakePhoto>
      <Link to='/createUser'>
        <button className="button">Create a new user</button>
      </Link>
    </div>
  );
}
