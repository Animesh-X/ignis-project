import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Events App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default NavBar;
  