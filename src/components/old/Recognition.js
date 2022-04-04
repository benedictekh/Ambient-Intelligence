import React, { useState } from 'react';
import ImageUrl from './ImageUrl';
import ImageUpload from './ImageUpload';
import './Recognition.css';


const Recognition = () => {
  const [isUploadFromDevice, setIsUploadFromDevice] = useState(false);

  const handleIsUploadFromDevice = () => {
    setIsUploadFromDevice(!isUploadFromDevice)
  }

  return (
    <div>
      <h1 className='header'>Face Recognition App</h1>
      <div className='container'>
        <div className='sub-container'>
          <h2 className='sub-header'>Try it out!</h2>
          {isUploadFromDevice ? <ImageUpload/> : <ImageUrl/>}
          {isUploadFromDevice ? <p className='url-upload-toggle' onClick={handleIsUploadFromDevice}>Or enter url ?</p> : <p className='url-upload-toggle' onClick={handleIsUploadFromDevice}>Or upload from device ?</p>}
        </div>
      </div>
    </div>
  );
}
export default Recognition;