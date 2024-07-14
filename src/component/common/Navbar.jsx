 PhanDucManh
import React from 'react';
=======

import React, { useState, useEffect, useContext } from 'react';
 main
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import CartContext from '../CartContext';

PhanDucManh
function CustomNavbar({ user, setUser, setIsAuthenticated }) {
  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/'; // Redirect to home page after logout
=======
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
 main
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
 PhanDucManh
        <Navbar.Brand href="/">Ecommer</Navbar.Brand>
=======
        <Navbar.Brand as={Link} to="/">Ecommer</Navbar.Brand>
 main
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
 PhanDucManh
                  Hello, {user.username && user.name.firstname}
=======
                  Hello, {user.name.firstname}
 main
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
 PhanDucManh
          <Nav style={{marginleft: '5px'}}>
            <Button variant="outline-dark" as={Link} to="/cart" >
              <i className='fa fa-shopping-cart' ></i> Cart 
=======
          <Nav>
            <Button variant="outline-dark" as={Link} to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart({totalCartItem})
 main
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
