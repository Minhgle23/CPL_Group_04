import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import CartContext from '../CartContext';

function CustomNavbar() {
  const [user, setUser] = useState(null);
  const { totalCartItem } = useContext(CartContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // Redirect to the main page after logout
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Ecommer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Nav.Link href="#">Link</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                  Hello, {user.name.firstname}
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
          <Nav>
            <Button variant="outline-dark" as={Link} to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart({totalCartItem})
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
