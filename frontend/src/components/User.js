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
            else if(userPreference == 3) {
                socket.emit('turnOffRed');
                socket.emit('turnOffYellow');
                socket.emit('turnOnBlue');
            }
            else if(userPreference == 2) {
                socket.emit('turnOffRed');
                socket.emit('turnOffBlue');
                socket.emit('turnOnYellow');
            }
        }
    }, [userPreference])

    const preferences = {'1' : 'red', '2' : 'yellow', '3' : 'blue'}

    return(
        <div className="formDiv">
            <h1 className="header">Welcome {props.name}!</h1>
            <h2>Your light preference is </h2>
            {userPreference == '1' ? <h2 className="preference_red">{preferences[userPreference]}</h2> : null}
            {userPreference == '3' ? <h2 className="preference_blue">{preferences[userPreference]}</h2> : null}
            {userPreference == '2' ? <h2 className="preference_yellow">{preferences[userPreference]}</h2> : null}
            <Link to="/">
                <button className="button">Back</button>
            </Link>
        </div>
    );
}
