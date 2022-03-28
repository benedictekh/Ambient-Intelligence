import React from "react";
import * as faceapi from "face-api.js"
import { useEffect, useRef, useState } from "react";
import person from '../person.jpg';

function FaceRec() {
    const videoRef = useRef(null);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    const [ isOnPage, setIsOnPage] = useState(true);

    const handleVideoPlay = () => {
        console.log("inside handleVideoPlay")
        setInterval(async () => {
        if(isOnPage){
            console.log("inside if(isOnPage)")
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
            const displaySize = {
                width: 720,
                height: 560,
            };
        faceapi.matchDimensions(canvasRef.current, displaySize);
        
        console.log("over detections")

        const image = document.getElementById("image")
        const detections = await faceapi.detectAllFaces(image, new 
        faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log(detections)

        console.log("under detections")

        const resizeDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef.current.getContext("2d").clearRect(0, 0, 720, 560);

        faceapi.draw.drawDetections(canvasRef.current, resizeDetections);

        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);

        faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
        }else{
            return;
        }
        }, 100);
    };

    const detectFaces = async () => {
        console.log("Started detection")
        // const detections = await faceapi
        //     .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        //     .withFaceLandmarks()
        //     .withFaceExpressions()

        setInterval(async () => {
                console.log("inne")
                const detections = await faceapi.detectAllFaces(videoRef.current, 
                    new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                    console.log("Finished detection")
                    console.log(detections)
            },100)
            
        

        // console.log(detections)
        //  setInterval(async () => {
        //             console.log("inne")
        //             const detections = await faceapi.detectAllFaces(videoRef.current, 
        //                 new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        //                 console.log("kkk")
        //         },100)

    }

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video:true});
        videoRef.current.srcObject = stream;
        console.log("video started");
        handleVideoPlay()
    }

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                Promise.all([
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceExpressionNet.loadFromUri('/models')
                ]).then(startVideo)
                .catch(err => {console.log("Error in loading face-api models")})
                console.log("models loaded")

            } catch (err){
                console.log(err);
            }
        };
        getUserMedia();
    },[]);


    return (
    <div className="FaceRec">
        <script src="../face-api.min.js"></script>
        <video id="video" width="720" height="560" ref={videoRef} autoPlay muted></video>
        {/* <img src={person} ref={imgRef} id="image" ></img> */}

        <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
    );
}

export default FaceRec;
