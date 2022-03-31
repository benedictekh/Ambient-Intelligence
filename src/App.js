import "./App.css";
import CreateFaceGroup from "./components/CreateFaceGroup";
import Photo from "./components/Photo";
// import { AllUsersList } from "./components/allUsersList";
// import { CreateUserForm } from "./components/CreateUserForm";
import Recognition from "./components/Recognition";
import TakePhoto from "./components/TakePhoto";

function App() {
  return (
    <div className="App">
      {/* <CreateUserForm></CreateUserForm> */}
      {/* <Recognition></Recognition> */}
      <CreateFaceGroup></CreateFaceGroup>
    </div>
  );
}

export default App;
