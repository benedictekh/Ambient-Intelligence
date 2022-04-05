import { AllUsersList } from "../components/allUsersList";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "../../src/index.css";
import { CreateUserForm } from "../components/CreateUserForm";

export function DefaultView() {
  const socket = socketIOClient("http://localhost:4001");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
      socket.emit("turnOffRed");
      socket.emit("turnOffBlue");
      socket.emit("turnOfYellow");
    });
  }, []);

  return (
    <div className="allUsersDiv">
      <CreateUserForm></CreateUserForm>
    </div>
  );
}
