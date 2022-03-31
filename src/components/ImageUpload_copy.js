import React, { useState, useEffect, useRef } from "react";
import { faceApiForUpload } from "./FaceApi";
import "./ImageUpload.css";
import TakePhoto from "./TakePhoto";
import Webcam from "react-webcam";

const ImageUpload_copy = () => {

  const [data, setData] = useState([])
  const [file, setFile] = useState({});
  const [outputImage, setOutputImage] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const faceRectangleStyle = (item) => {
    return ({
      position: 'absolute',
      top: `${item.faceRectangle.top}px`,
      left: `${item.faceRectangle.left}px`,
      width: `${item.faceRectangle.width}px`,
      height: `${item.faceRectangle.height}px`,
      border: '2px solid #BA0B93',
      textAlign: 'center',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold'
    });
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  // const handleUpload = (event) => {
  //   TakePhoto.startCamera();
  //   setFile(TakePhoto.takeSnapshot());
  // }

  const handleUpload = (event) => {
    // setFile(webcamRef.current.getScreenshot());
    // console.log(webcamRef.current.getScreenshot())
    var img = new Image(500,500);
    img.src = webcamRef.current.getScreenshot();
    setFile(img)
  }

    //   capture = () => {
    //     const imageSrc = this.webcam.getScreenshot();
    //     this.setState({
    //         ImageData: imageSrc
    //     })
    //     this.handleSubmit(imageSrc)
    // };

    // Upload to local seaweedFS instance
  const uploadImage = async file => {
    const formData = new FormData();
    formData.append('file', file);

    // Connect to a seaweedfs instance
  };


  const handleSubmit = async () => {
    try {
      const response = await faceApiForUpload.post(
        `/face/v1.0/detect`,
        file
      );
      setData(response.data);
      setOutputImage(true);
    }
    catch (err) {
      console.log(err.response.data);
      window.alert("An error occured");
    }
  }

  const handleBack = () => {
    setOutputImage(false);
    setFile({});
  }

  return (
    <div>
      {(!outputImage) ?
        <div className='center'>
          <div>
            <div className='file-input'>
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpg" videoConstraints={videoConstraints} />
                <button onClick={handleUpload}>Capture photo</button>
              {/* <input type="file" id="file" name="file" className='file' accept=".jpg,.jpeg,.png" onChange={handleUpload} />
              <label htmlFor="file">Select file</label> */}
            </div>
            <button className={file.name ? 'submit-btn' : 'disabled-submit-btn'} type="button" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
        :
        <div className='output-container'>
          <div className="center">
            <div className="center-output-image">
              <img src={URL.createObjectURL(file)} alt="output from azure" />
              {data && data.map(item => {
                return (
                  <div key={item.faceId} style={faceRectangleStyle(item)}></div>
                )
              })
              }
            </div>
          </div>
          {data.length > 0 ?
            <div className="description">
              {
                data.map(item => {
                  return (
                    <div key={item.faceId} className="element">
                      <p>Gender: {item.faceAttributes.gender}</p>
                      <p>Age: {item.faceAttributes.age}</p>
                      <p>Glasses: {item.faceAttributes.glasses}</p>
                    </div>
                  )
                })
              }
            </div> : <p style={{ textAlign: 'center', color: 'red' }}>No face detected</p>
          }
          <div className='center'>
            <button className='back-btn' type="button" onClick={handleBack}>BACK</button>
          </div>
        </div>
      }
    </div>
  );
}

export default ImageUpload_copy;