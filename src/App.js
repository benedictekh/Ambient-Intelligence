import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import Monitor from "./components/monitor";
// import Register from "./components/Register";
// import { PersonContextProvider } from "./PersonContextProvider";
// import RandomBackground from "./components/randomBackground";
// import objectDetectionSketch from './components/objectDetectionSketch';
import Detection from './components/Detection';
import {ReactP5Wrapper} from 'react-p5-wrapper';
import FaceRec from "./components/FaceRec";

function App() {
  return (
    <div>
      <script src="./face-api.min.js"></script>
      <video id="video" autoPlay muted></video>
      <ReactP5Wrapper sketch={Detection} />
    </div>
    // <FaceRec></FaceRec>
  );
}

export default App;