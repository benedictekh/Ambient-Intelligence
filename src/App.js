import "./App.css";
import CreateUserGroup from "./components/CreateUserGroup";
import { TakePhoto } from "./components/TakePhoto";

function App() {
  return (
    <div className="App">
      <TakePhoto></TakePhoto>
      <CreateUserGroup></CreateUserGroup>
    </div>
  );
}

export default App;
