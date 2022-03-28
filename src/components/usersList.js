import { getAllUsers } from "../service/apiCalls";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './usersList.css';

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
          <div key={item.name}>
            <Link to='/user' state={{name: item.name}}>
              <button>
                {item.name}
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
