import "./App.css";
import CreateUserGroup from "./components/CreateUserGroup";
import { TakePhoto } from "./components/TakePhoto";
import { AllUsersList } from "./components/allUsersList";
import { DefaultView } from "./views/DefaultView";
import { PersonalizedView } from "./views/PersonalizedView";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <TakePhoto></TakePhoto>
//       <CreateUserGroup></CreateUserGroup>
//     </div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultView />} />
        <Route path="/user" element={<PersonalizedView />} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
