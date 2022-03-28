import { getAllUsers } from "../service/apiCalls";
import axios from "axios";
import { useEffect, useState } from "react";

export function AllUsersList(props) {
  const [allUsersAPI, setAllUsersAPI] = useState([]);

  async function getAllUsersList() {
    axios.get("http://localhost:5000/user/userDB/getAll").then((response) => {
      setAllUsersAPI(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    getAllUsersList();
  }, []);

  return (
    <div>
      {allUsersAPI.map((item, i) => {
        return (
          <div>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}
