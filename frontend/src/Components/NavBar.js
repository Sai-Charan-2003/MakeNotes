import { Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <nav className="nav">
        <Navbar>
          <Navbar.Brand className="navbar-brand text-light" href="/">
            MakeNotes
          </Navbar.Brand>
          <Container>
            <Nav className="nav-links">
              <Nav.Item>
                <Nav.Link className="text-light" href="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-light" href="/signup">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
