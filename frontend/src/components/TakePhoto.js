import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Webcam from "react-webcam";
import { faceApiForAddFaceToPerson, faceApiForIdentification, faceApiForUpload } from './FaceApi';
import axios from "axios";


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const TakePhoto = () => {
    const [image,setImage]=useState('');
    const [person, setPerson] = useState(null);
    const webcamRef = React.useRef(null);
    const [personIdentified, setPersonIdentified] = useState(false);

    var users = {}

    async function getAllUsers() {
        axios.get(`http://localhost:5000/user/userDB/getAll`).then((response) => {
            response.data.map((p) => {
                users[p.faceID] = p.name
            })
        console.log(users);
        })
    }
    
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
      console.log(response)
      let id = new Array();
      response.data.map((person) => {id.push(person.faceId)})
        console.log(id)
        const body = {'faceIds': id, 'personGroupId': 'ai'}
        console.log(body)

        const resp = await faceApiForIdentification.post(
          '/face/v1.0/identify',
            body
      )
      console.log(resp)
        let bestMatchValue = 0;
        let identifiedPerson;
        resp.data[0].candidates.map((p) => {
            if(p.confidence > bestMatchValue){
                bestMatchValue = p.confidence;
                identifiedPerson = p.personId;
            }
        })
      console.log(identifiedPerson)
      setPersonIdentified(true)
      setPerson(users[identifiedPerson])
      console.log(users[identifiedPerson])
    }
    catch (err) {
      console.log(err.response.data);
      window.alert("An error occured");
    }
    }

    // const addPictures = async () => {
    //     try {
    //         const im = webcamRef.current.getScreenshot();
    //         const s = im.split(",");
    //         const blob = b64toBlob(s[1]);
    //         const response = await faceApiForAddFaceToPerson.post(
    //         `/face/v1.0/persongroups/AI/persons/0dc77f93-1e76-4ca7-91c5-ee5ce68a98ff/persistedFaces`,
    //         blob

    //     );
    //     console.log(response)
    //     }
    //     catch (err) {
    //     console.log(err.response.data);
    //     window.alert("An error occured");
    //     }
    // }

    return (
        <div>
            {personIdentified ? 
            <div>
                <p>Welcome {person}</p>
                <Link to='/user' state={{name:person}}>
                    <button>Go to your page</button>
                </Link>
            </div>
            : 
            <div className="webcam-container">
            <div className="webcam-img">
                {image == '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    capture();
                }}
                    className="webcam-btn">Capture</button>
            </div>
            {/* <button onClick={handleSubmit}>Take picture</button> */}
            {/* <button onClick={addPictures}>add picture</button> */}   
      </div>
        }
      </div>

    );
};