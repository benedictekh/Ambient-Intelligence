import axios from "axios";
import { useEffect, useState } from "react";
import socketIOClient from 'socket.io-client';


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
        console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    });
    }, []);

    useEffect(() => {
        if(userPreference != null){
            if(userPreference == 0) {
                socket.emit('turnOffBlue');
                socket.emit('turnOfYellow');
                socket.emit('turnOnRed');
            }
            else if(userPreference == 1) {
                socket.emit('turnOffRed');
                socket.emit('turnOfYellow');
                socket.emit('turnOnBlue');
            }
            else if(userPreference == 2) {
                socket.emit('turnOffRed');
                socket.emit('turnOffBlue');
                socket.emit('turnOnYellow');
            }
            else if(userPreference == 3) {
                socket.emit('turnOfYellow');
                socket.emit('turnOnRed');
                socket.emit('turnOnBlue');
            }
            else if(userPreference == 4) {
                socket.emit('turnOffBlue');
                socket.emit('turnOnRed');
                socket.emit('turnOnYellow');
            }
        }
    }, [userPreference])

    return(
        <div>
            <p>{props.name}</p>
            <p>{userPreference}</p>
        </div>
    );
}