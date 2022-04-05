import { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./userForm.css";

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [yearBorn, setYearBorn] = useState(null);
  const [role, setRole] = useState(null);
  const [preference, setPreference] = useState(null);

  async function createUser() {
    axios
      .post("http://localhost:5000/user/userDB/create", {
        name: name,
        yearBorn: yearBorn,
        role: role,
        preference: preference,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <div className="formDiv">
      <h1 className="header">CREATE NEW USER</h1>
      <form onSubmit={createUser} className="createForm">
        <label className="formLabel">
          Enter your name:
          <input
            className="inputBox"
            name="name"
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Enter the year you were born:
          <input
            className="inputBox"
            type="text"
            value={yearBorn || ""}
            onChange={(e) => setYearBorn(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Enter your role:
          <input
            className="inputBox"
            type="text"
            value={role || ""}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Enter your preference:
          <input
            className="inputBox"
            type="text"
            value={preference || ""}
            onChange={(e) => {
              setPreference(e.target.value);
            }}
          />
        </label>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
}
