import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import './user.css';


export function User(props) {
    const [userPreference, setUserPreference] = useState([]);
    const socket = socketIOClient("http://localhost:4001");

    async function getUserPreference(name) {
        axios.get(`http://localhost:5000/user/userDB/get/${name}`).then((response) => {
        setUserPreference(response.data.user.preference);
        })
    }

    useEffect(() => {
        getUserPreference(props.name);
        socket.on("connect", () => {
    });
    }, []);

    useEffect(() => {
        if(userPreference != null){
            if(userPreference == 1) {
                socket.emit('turnOffBlue');
                socket.emit('turnOffYellow');
                socket.emit('turnOnRed');
            }
            else if(userPreference == 2) {
                socket.emit('turnOffRed');
                socket.emit('turnOffYellow');
                socket.emit('turnOnBlue');
            }
            else if(userPreference == 3) {
                socket.emit('turnOffRed');
                socket.emit('turnOffBlue');
                socket.emit('turnOnYellow');
            }
        }
    }, [userPreference])

    return(
        <div className="formDiv">
            <p>Welcome {props.name}!</p>
            <p>Your light preference is {userPreference}</p>
            <Link to="/">
                <button className="button">Back</button>
            </Link>
        </div>
    );
}