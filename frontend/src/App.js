import "./App.css";
import DefaultView from "./views/DefaultView";
import { PersonalizedView } from "./views/PersonalizedView";
import CreateUserForm from "./components/CreateUserForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultView />} />
        <Route path="/user" element={<PersonalizedView />} />
        <Route path="/createUser" element={<CreateUserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
