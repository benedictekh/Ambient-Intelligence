import React, { useState } from "react";
import Webcam from 'react-webcam';
import ImageUpload from "./ImageUpload";
import SendImage from "./SendImage";
import { faceApiForUpload } from "./FaceApi";


class TakePhoto extends React.Component {

    state = {
        ImageData: null, 
        Image_name: '',
        saveImage: false
    }

    setRef = (webcam) =>{
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            ImageData: imageSrc
        })
        this.handleSubmit(imageSrc)
    };

    onClickRetake = (e) => {
        e.persist();
        this.setState({
            ImageData: null
        })
    }

    onClickSave = (e) => {
        e.persist();
        this.setState((previousState) => {
            return {
                saveImage: !previousState.saveImage
            }
        });
    }

    handleChange = (e) => {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSaveSubmit = (e) => {
        e.preventDefault();
        let imageObject = {
            Image_name: this.state.Image_name,
            ImageData: this.state.ImageData
        }
        this.handleSubmit()
        console.log(imageObject)
        
    }

    handleSubmit = async (image) => {
        try {

            
            // console.log(this.state.ImageData)
            var img = new Image(500,500);
            // img.src = `data:image/jpg;base64,${this.state.ImageData}`;
            img.src = image
        

            console.log(img)
            const response = await faceApiForUpload.post(
                `/face/v1.0/detect`,
                img
                
            );
    
        // setData(response.data);
            console.log(response.data)

        // setOutputImage(true);
        }
        catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
        }
    }


    saveForm = () => {
        return(
            <div>
                <form onSubmit={this.handleSaveSubmit}>
                    <p>
                        <label>Image name: </label>
                        <input
                            name="image_name"
                            value={this.state.Image_name}
                            onChange={this.handleChange} />
                        <input type="submit" value="Save" />
                    </p>
                </form>
            </div>
        )
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user',
        };

        return (
            <div>
                <Webcam 
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
                />
                <div className="button-container"><button onClick={this.capture}>Capture photo</button></div>
                {this.state.ImageData ? 
                    <div>
                        <p><img src={this.state.ImageData} alt=""></img></p>
                        <span><button onClick={this.onClickRetake}>Retake?</button></span>
                        <span><button onClick={this.onClickSave}>Save</button></span>
                        {this.state.saveImage ? this.saveForm() : null}
                    </div>
                : null }
            </div>
        );
    }
};

export default TakePhoto;