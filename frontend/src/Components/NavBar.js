import { Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <nav className="nav">
        <div className="navbar">
          <a href="/" className="navbar-brand text-light">
            <h1>MakeNotes</h1>
          </a>
          <ul className="nav-links">
            <li className="nav-item">
              <a className="text-light" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="text-light" href="/signup">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
