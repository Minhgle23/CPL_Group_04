import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';

function CustomNavbar({ user, setUser, setIsAuthenticated }) {
  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Ecommer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Product</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Nav.Link href="#">Link</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                  Hello, {user.username && user.name.firstname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="outline-dark" as={Link} to="/login">
                <i className="fa fa-sign-in"></i> Login
              </Button>
            )}
          </Nav>
          <Nav style={{marginleft: '5px'}}>
            <Button variant="outline-dark" as={Link} to="/cart" >
              <i className='fa fa-shopping-cart' ></i> Cart 
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
