import React, { useState } from 'react';
import Webcam from "react-webcam";
import { faceApiForAddFaceToPerson, faceApiForIdentification, faceApiForUpload } from './FaceApi';


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const TakePhoto = () => {

    var users = {'0dc77f93-1e76-4ca7-91c5-ee5ce68a98ff' : 'Benedicte'}

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        
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

    
  const handleSubmit = async () => {
    try {
        const s = image.split(",");
        const blob = b64toBlob(s[1]);
        const response = await faceApiForUpload.post(
        `/face/v1.0/detect`,
        blob
      );
      let id = new Array();
      response.data.map((person) => {id.push(person.faceId)})
        console.log(id)
        const body = {'faceIds': id, 'personGroupId': 'test'}
        console.log(body)

        const resp = await faceApiForIdentification.post(
          '/face/v1.0/identify',
            body
      )
      console.log(resp)
      var identifiedUser = users[resp.data[0].candidates[0].personId]
      console.log(identifiedUser)
    }
    catch (err) {
      console.log(err.response.data);
      window.alert("An error occured");
    }
  }

    const addPictures = async () => {
        try {
            const im = webcamRef.current.getScreenshot();
            const s = im.split(",");
            const blob = b64toBlob(s[1]);
            const response = await faceApiForAddFaceToPerson.post(
            `/face/v1.0/persongroups/test/persons/0dc77f93-1e76-4ca7-91c5-ee5ce68a98ff/persistedFaces`,
            blob

        );
        console.log(response)
        }
        catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
        }
    }

    return (
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
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
            <button onClick={handleSubmit}>send</button>
            <button onClick={addPictures}>add picture</button>
        </div>
    );
};