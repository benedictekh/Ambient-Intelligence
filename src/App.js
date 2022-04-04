import "./App.css";
import CreateUserGroup from "./components/CreateUserGroup";
// import { AllUsersList } from "./components/allUsersList";
// import { CreateUserForm } from "./components/CreateUserForm";
import { WebcamCapture } from "./components/TakePhoto2";
// import TakePhoto from "./components/TakePhoto";

function App() {
  return (
    <div className="App">
      <WebcamCapture></WebcamCapture>
      <CreateUserGroup></CreateUserGroup>
    </div>
  );
}

export default App;
