import "./App.css";
// import { AllUsersList } from "./components/allUsersList";
// import { CreateUserForm } from "./components/CreateUserForm";
import Recognition from "./components/Recognition";
import TakePhoto from "./components/TakePhoto";

function App() {
  return (
    <div className="App">
      {/* <CreateUserForm></CreateUserForm> */}
      <TakePhoto></TakePhoto>
    </div>
  );
}

export default App;
