import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = ({ username }) => {
    const navigate = useNavigate();
  // Function to handle logout
  const handleLogout = async () => {
    const authorization = localStorage.getItem('token');
    const headers = authorization ? { Authorization: `Token ${authorization}` } : {};

    try {
        console.log(headers);
      await axios.post('http://127.0.0.1:8000/account/logout/', null, { headers });
      console.log('Logout successful');
      localStorage.removeItem('token'); // Clear token from localStorage
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Logout error:', error);
      
    }
  };


  // Check if username is null or undefined, set it to an empty string if so
  const displayUsername = username || '';

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/dashboard">Events App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/likedevents">Liked Events</Nav.Link>
          <Nav.Link as={Link} to="/addevent">Add Event</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    marginRight: '5px',
                  }}
                >
                  {displayUsername.charAt(0)}
                </div>
                <span>{displayUsername}</span>
              </div>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
