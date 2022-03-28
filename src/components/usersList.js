import { getAllUsers } from "../service/apiCalls";
import axios from "axios";
import { useEffect, useState } from "react";

export function AllUsersList(props) {
  const [allUsersAPI, setAllUsersAPI] = useState([]);
  const [userPreference, setUserPreference] = useState([]);

  async function getAllUsersList() {
    axios.get("http://localhost:5000/user/userDB/getAll").then((response) => {
      setAllUsersAPI(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    getAllUsersList();
  }, []);


  async function getUserPreference(name) {
    axios.get(`http://localhost:5000/user/userDB/get/${name}`).then((response) => {
      setUserPreference(response.data.user.preference);
    })
  }

  return (
    <div>
      {allUsersAPI.map((item, i) => {
        return (
          <div>
            <button onClick={() => getUserPreference(item.name)}>{item.name}</button>
          </div>
        );
      })}
    </div>
  );
}
