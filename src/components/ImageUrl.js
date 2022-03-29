import React, { useState, useEffect } from "react";
import { faceApiForUrl } from "./FaceApi";
import "./ImageUrl.css";

const ImageUrl = () => {

  const [data, setData] = useState([])
  const [image, setImage] = useState("");
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

  const handleSubmit = async () => {
    try {
      const response = await faceApiForUrl.post(
        `/face/v1.0/detect`,
        {
          url: image
        }
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
    setImage("");
  }

  return (
    <div>
      {(!outputImage) ?
        <div className="center">
          <div>
            <input type="text" placeholder="paste image url here" value={image} onChange={event => setImage(event.target.value)} />
            <button className={image ? 'submit-btn' : 'disabled-submit-btn'} type="button" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
        :
        <div className='output-container'>
          <div className="center">
            <div className="center-output-image">
              <img src={image} alt="output from azure" />
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

export default ImageUrl;