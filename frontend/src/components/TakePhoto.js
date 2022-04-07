import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import { faceApiForAddFaceToPerson, faceApiForIdentification, faceApiForUpload } from './FaceApi';
import axios from "axios";
import './takePhoto.css'


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

export const TakePhoto = () => {
    const [image,setImage]=useState('');
    const [person, setPerson] = useState(null);
    const webcamRef = React.useRef(null);
    const [personIdentified, setPersonIdentified] = useState(false);
    let navigate = useNavigate();

    var users = {}

    async function getAllUsers() {
        axios.get(`http://localhost:5000/user/userDB/getAll`).then((response) => {
            response.data.map((p) => {
                users[p.faceID] = p.name
            })
        console.log(users);
        })
    }

    useEffect(() => {
        if (person != null){
            return navigate("/user" , {state: person});
        }
        },[person]);
    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        handleSubmit(imageSrc)
        
    });

    useEffect(() => {
        getAllUsers()
    }, [])

    const b64toBlob = (b64DataStr, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64DataStr);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    
  const handleSubmit = async (imageSrc) => {
    try {
        const s = imageSrc.split(",");
        const blob = b64toBlob(s[1]);
        console.log(blob)
        const response = await faceApiForUpload.post(
        `/face/v1.0/detect`,
        blob
      );
      let id = new Array();
      response.data.map((person) => {id.push(person.faceId)})
        const body = {'faceIds': id, 'personGroupId': 'ai'}
        const resp = await faceApiForIdentification.post(
          '/face/v1.0/identify',
            body
      )
        let bestMatchValue = 0;
        let identifiedPerson;
        resp.data[0].candidates.map((p) => {
            if(p.confidence > bestMatchValue){
                bestMatchValue = p.confidence;
                identifiedPerson = p.personId;
            }
        })
      setPersonIdentified(true)
      setPerson(users[identifiedPerson])
      console.log(users[identifiedPerson])
    }
    catch (err) {
      console.log(err.response.data);
      window.alert("An error occured");
        }

    }

    return (
        <div className="formDiv">
            <div>
                {image == '' ? <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    capture();
                }}
                    className="button">Take a picture</button>
            </div>
            {/* <button onClick={handleSubmit}>Take picture</button> */}
            {/* <button onClick={addPictures}>add picture</button> */}   
      </div>
    );
};