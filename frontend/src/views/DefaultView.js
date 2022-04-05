import { AllUsersList } from "../components/allUsersList";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "../../src/index.css";
import CreateUserForm from "../components/CreateUserForm";
import CreateUserGroup from "../components/CreateUserGroup";
import { TakePhoto } from "../components/TakePhoto";
import { Link } from 'react-router-dom';
import { faceApiForTraining } from "../components/FaceApi";


export default function DefaultView() {
  // const socket = socketIOClient("http://localhost:4001");

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  //     socket.emit("turnOffRed");
  //     socket.emit("turnOffBlue");
  //     socket.emit("turnOfYellow");
  //   });
  // }, []);
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
    <div className="allUsersDiv">
      <p>Welcome! Take a picture or register a new user</p> 
      <TakePhoto></TakePhoto>
      <Link to='/createUser'>
        <button>Create a new user</button>
      </Link>
      {/* <button onClick={trainData}>train</button> */}
      {/* <CreateUserGroup></CreateUserGroup> */}
    </div>
  );
}
