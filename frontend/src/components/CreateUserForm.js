import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./userForm.css";
import { faceApiForAddFaceToPerson, faceApiForIdentification, faceApiForUpload, faceApiForTraining, faceApiForCreatePersonGroup } from './FaceApi';
import Webcam from "react-webcam";
import { Link } from 'react-router-dom';


export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [yearBorn, setYearBorn] = useState(null);
  const [role, setRole] = useState(null);
  const [preference, setPreference] = useState(null);
  const [id, setId] = useState(null);
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  const baseURL = "https://ambient-intelligence-group-3.cognitiveservices.azure.com/";
  const detectionModel03 = 'detection_03';
  const subscriptionKey = "86c96d069b2e48c891a35d82c9cc6ff7";


  var numberOfPictures = 0;

  async function createUser(userId) {
    axios
      .post("http://localhost:5000/user/userDB/create", {
        name: name,
        yearBorn: yearBorn,
        role: role,
        preference: preference,
        faceID: userId
      })
      .then((response) => {
        console.log(response.data);
      });
      setInfoSubmitted(true);
      console.log("info submitted");
  }
  
  const addPeople = async (e) => {
    e.preventDefault()
    console.log("add people")
      try {
          const response = await faceApiForCreatePersonGroup.post(
          `/face/v1.0/persongroups/ai/persons`,
          {'name': name}
        );
        console.log(response);
        setId(response.data.personId);
        console.log("the new persons id is " + response.data.personId);
        createUser(response.data.personId);
        }
      catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
      }
  }

  const trainData = async () => {
      try {
          const response = await faceApiForTraining.post(
          `/face/v1.0/persongroups/ai/train`

      );
      console.log(response)
      }
      catch (err) {
      console.log(err.response.data);
      window.alert("An error occured");
      }
  }
  
  const TakePhotos = () => {
      const [image,setImage] = useState('');
      const webcamRef = React.useRef(null);

      const capture = React.useCallback(
          () => {
          const imageSrc = webcamRef.current.getScreenshot();
          setImage(imageSrc)    
          addPictures()
      });

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

    const faceApiForAddFaceToPerson = axios.create({
          baseURL: baseURL,
          timeout: 50000,
          headers: {
              "Ocp-Apim-Subscription-Key": subscriptionKey,
              "Content-Type": "application/octet-stream"
          },
          params: {
              personGroupId: 'ai',
              personId: id,
              detectionModel: detectionModel03
          }
      });

      const addPictures = async () => {
          try {
              const im = webcamRef.current.getScreenshot();
              const s = im.split(",");
              const blob = b64toBlob(s[1]);
              const response = await faceApiForAddFaceToPerson.post(
              `/face/v1.0/persongroups/ai/persons/${id}/persistedFaces`,
              blob

          );
          console.log(response)
          numberOfPictures = numberOfPictures + 1;
          }
          catch (err) {
          console.log(err.response.data);
          window.alert("An error occured");
          }
      }
      const videoConstraints = {
          width: 220,
          height: 200,
          facingMode: "user"
      };
      
      return (
          <div className="webcam-container">
            <p>You have to take 10 pictures</p>
            <p>You have now taken {numberOfPictures} pictures</p>
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
                  {image != '' ?
                      <button onClick={(e) => {
                          e.preventDefault();
                          setImage('')
                      }}
                          className="webcam-btn">
                          New picture</button> :
                      <button onClick={(e) => {
                          e.preventDefault();
                          capture();
                      }}
                          className="webcam-btn">Take picture</button>
                  }
              </div>
              {numberOfPictures == 10 ?
              <div>
                <p>You have taken enough pictures now!</p>
                <Link to='/'>
                  <button onClick={trainData}>Go back to front page</button>
                </Link>
              </div>
               : null}
          </div>
      );
  };

  return (
    <div>
    {infoSubmitted ? 
    <TakePhotos></TakePhotos>
    :
    <div className="formDiv">
      <h1 className="header">CREATE NEW USER</h1>
      <form onSubmit={addPeople} className="createForm">
        <label className="formLabel">
          Enter your name:
          <input
            className="inputBox"
            name="name"
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Enter the year you were born:
          <input
            className="inputBox"
            type="text"
            value={yearBorn || ""}
            onChange={(e) => setYearBorn(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Enter your role:
          <input
            className="inputBox"
            type="text"
            value={role || ""}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Enter your preference:
          <input
            className="inputBox"
            type="text"
            value={preference || ""}
            onChange={(e) => {
              setPreference(e.target.value);
            }}
          />
        </label>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
      }
    </div>
  );
}
