import { Outlet } from "react-router-dom";
import "./NoteNav.css";

function NoteNav() {
  return (
    <div className="NavBar">
      <nav className="nav">
        <div className="navbar">
          <a href="/notes" className="navbar-brand text-light">
            <h1>MakeNotes</h1>
          </a>
          <ul className="nav-links">
            <li className="nav-item">
              <a className="text-light" href="/createnote">
                Create Note
              </a>
            </li>
            <li className="nav-item">
              <a className="text-light" href="/logout">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NoteNav;
