import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateNote from "./Components/CreateNote";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import RenderNote from "./Components/RenderNote";
import NoteNav from "./Components/NoteNav";
import LogOut from "./Components/LogOut";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<NoteNav />}>
          <Route path="notes" element={<RenderNote />} />
          <Route path="createnote" element={<CreateNote />} />
          <Route path="logout" element={<LogOut />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
