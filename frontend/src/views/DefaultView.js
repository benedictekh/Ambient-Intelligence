import socketIOClient from "socket.io-client";
import "../../src/index.css";
import CreateUserForm from "../components/CreateUserForm";
import CreateUserGroup from "../components/CreateUserGroup";
import { TakePhoto } from "../components/TakePhoto";
import { Link } from 'react-router-dom';
import { faceApiForTraining } from "../components/FaceApi";
import React, { useEffect } from "react";
import "../components/takePhoto.css"


export default function DefaultView() {
  const socket = socketIOClient("http://localhost:4001");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); 
      socket.emit("turnOffRed");
      socket.emit("turnOffBlue");
      socket.emit("turnOfYellow");
    });
  }, []);
  //   const trainData = async () => {
  //     try {
  //         const response = await faceApiForTraining.post(
  //         `/face/v1.0/persongroups/ai/train`

  //     );
  //     console.log(response)
  //     }
  //     catch (err) {
  //     console.log(err.response.data);
  //     window.alert("An error occured");
  //     }
  // }

  return (
    <div className="formDiv">
      <p>Welcome! Take a picture or register as a new user</p> 
      <TakePhoto></TakePhoto>
      <Link to='/createUser'>
        <button className="button">Create a new user</button>
      </Link>
    </div>
  );
}
