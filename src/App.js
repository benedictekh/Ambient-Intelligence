import "./App.css";
import CreateFaceGroup from "./components/CreateFaceGroup";
import CreateUserGroup from "./components/CreateUserGroup";
// import { AllUsersList } from "./components/allUsersList";
// import { CreateUserForm } from "./components/CreateUserForm";
import Recognition from "./components/old/Recognition";
import { WebcamCapture } from "./components/TakePhoto2";
// import TakePhoto from "./components/TakePhoto";

function App() {
  return (
    <div className="App">
      {/* <CreateUserForm></CreateUserForm> */}
      {/* <Recognition></Recognition> */}
      {/* <CreateFaceGroup></CreateFaceGroup> */}
      {/* <TakePhoto></TakePhoto> */}
      <WebcamCapture></WebcamCapture>
      <CreateUserGroup></CreateUserGroup>
    </div>
  );
}

export default App;
