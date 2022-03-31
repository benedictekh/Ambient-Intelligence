import axios from "axios";
import { useEffect, useState } from "react";

export function User(props) {
  const [userPreference, setUserPreference] = useState([]);

  async function getUserPreference(name) {
    axios
      .get(`http://localhost:5000/user/userDB/get/${name}`)
      .then((response) => {
        setUserPreference(response.data.user.preference);
      });
  }

  useEffect(() => {
    getUserPreference(props.name);
  }, []);

  return (
    <div>
      <p>{props.name}</p>
      <p>{userPreference}</p>
    </div>
  );
}
