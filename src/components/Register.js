import React from "react";
import { useInput } from "../hooks/inputHook";
import P5Wrapper from "react-p5-wrapper";

import registerFaceSketch from "./registerFaceSketch";
import "./form.css"

export default function FaceRegister() {
  const { value: name, bind: bindName } = useInput("name");
  const { value: numberOfPictures, bind: bindNumberOfPictures } = useInput(
    "100"
  );
  const { value: showCamera, setValue: setShowCamera } = useInput(false);
  const { value: picturesTaken, setValue: setPicturesTaken } = useInput(0);

  const handleSubmit = event => {
    event.preventDefault();
    setShowCamera(true);
  };

  return (
    <div className="registerForm">
      {showCamera ? (
        <div>
          <h3>
            Taking {numberOfPictures} pictures of {name}
          </h3>
          <h3>
            Status:{" "}
            {parseInt((picturesTaken / parseInt(numberOfPictures)) * 100)} %
          </h3>
          <P5Wrapper
            sketch={registerFaceSketch}
            nameToRegister={name}
            picturesToTake={parseInt(numberOfPictures)}
            picturesTaken={picturesTaken}
            handlePictureTaken={() => setPicturesTaken(picturesTaken + 1)}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Register your face here</h3>
          <label>
            Name:
            <input type="text" {...bindName} />
          </label>
          <label>
            Number of pictures:
            <select {...bindNumberOfPictures}>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
}