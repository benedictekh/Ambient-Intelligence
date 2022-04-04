import React, { useState, useEffect } from "react";
import { faceApiForUpload } from "../FaceApi";
// import "./ImageUpload.css";
import TakePhoto from "./TakePhoto";

const SendImage = (props) => {

  const [data, setData] = useState([])
  const [file, setFile] = useState({});
  const [outputImage, setOutputImage] = useState(false);

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

//   const handleUpload = (event) => {
//     TakePhoto.startCamera();
//     setFile(TakePhoto.takeSnapshot());
//   }

  const handleSubmit = async () => {
    try {
      const response = await faceApiForUpload.post(
        `/face/v1.0/detect`,
        props.file
      );
      setData(response.data);
      setOutputImage(true);
    }
    catch (err) {
      console.log(err.response.data);
      window.alert("An error occured");
    }
  }

//   const handleBack = () => {
//     setOutputImage(false);
//     setFile({});
//   }

  return (
    <div>
      {(!outputImage) ?
        <div className='center'>
          <div>
            {/* <div className='file-input'>
              <input type="file" id="file" name="file" className='file' accept=".jpg,.jpeg,.png" onChange={handleUpload} />
              <label htmlFor="file">Select file</label>
            </div> */}
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
            {/* <button className='back-btn' type="button" onClick={handleBack}>BACK</button> */}
          </div>
        </div>
      }
    </div>
  );
}

export default SendImage;