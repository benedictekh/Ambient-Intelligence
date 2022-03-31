import { useRef } from "react";
import Webcam from "react-webcam";
import React from "react";
import { faceApiForUpload } from './FaceApi'
import axios from 'axios';


export default function Photo() {

    const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
    };

    const b64toBlob = (b64DataStr, contentType = '', sliceSize = 512) => {
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


    const subscriptionKey = '86c96d069b2e48c891a35d82c9cc6ff7';
    const baseURL = 'https://ambient-intelligence-group-3.cognitiveservices.azure.com/';
    const faceAttributes = "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
    const detectionModel = "detection_01";

    // const callCognitiveApi = (data) => {
    //     const config = {
    //         headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': subscriptionKey },
    //     };
    //     const response = axios
    //         .post(url, data, config)
    //         .then((res) => {
    //         console.log(res);
    //         })
    //         .catch((error) => {
    //         console.error(error);
    //         });
    //     };

    const callCognitiveApi = axios.create({
        baseURL: baseURL,
        timeout: 50000,
        headers: {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/octet-stream"
        },
        params: {
            returnFaceId: true,
            returnFaceLandmarks: false,
            returnFaceAttributes: faceAttributes,
            detectionModel: detectionModel
        }
    });

    const handleSubmit = async (image) => {
        try {

            
            // console.log(this.state.ImageData)
            // var img = new Image(500,500);
            // // img.src = `data:image/jpg;base64,${this.state.ImageData}`;
            // img.src = image
        

            console.log(image)
            const response = await callCognitiveApi.post(
                `/face/v1.0/detect`,
                image
                
            );
    
        // setData(response.data);
            console.log(response)

        // setOutputImage(true);
        }
        catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
        }
    }




    
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
    const base64Str = webcamRef.current.getScreenshot() || '';
    const s = base64Str.split(',');
    const blob = b64toBlob(s[1]);
    handleSubmit(blob);
    }, [webcamRef]);


    return (
        <div>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
        <button onClick={capture}>Capture photo</button>
        </div>

    )

}