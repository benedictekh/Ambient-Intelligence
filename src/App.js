import "./App.css";
import { AllUsersList } from "./components/allUsersList";
import { DefaultView } from "./views/DefaultView";
import { PersonalizedView } from "./views/PersonalizedView";
import { Arduino } from './components/Arduino'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<DefaultView />} />
    //     <Route path="/user" element={<PersonalizedView />} />     
    //   </Routes>
    // </BrowserRouter>
    <Arduino></Arduino>
  );
}

export default App;
