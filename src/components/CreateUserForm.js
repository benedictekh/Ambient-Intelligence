import { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

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
    <div>
      <form onSubmit={createUser}>
        <label>
          Enter your name:
          <input
            name="name"
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Enter the year you were born:
          <input
            type="text"
            value={yearBorn || ""}
            onChange={(e) => setYearBorn(e.target.value)}
          />
        </label>
        <label>
          Enter your role:
          <input
            type="text"
            value={role || ""}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <label>
          Enter your preference:
          <input
            type="text"
            value={preference || ""}
            onChange={(e) => {
              setPreference(e.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
