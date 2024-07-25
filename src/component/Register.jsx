import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    city: '',
    street: '',
    phone: '',
    role: 'USER'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/users';

    // Fetch existing users to check for duplicates
    fetch(url)
      .then(response => response.json())
      .then(users => {
        const emailExists = users.some(user => user.email === formData.email);
        const usernameExists = users.some(user => user.username === formData.username);

        if (emailExists) {
          toast.error("Email already exists!");
          return;
        }

        if (usernameExists) {
          toast.error("Username already exists!");
          return;
        }

        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters long!");
          return;
        }

        // Proceed with registration
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: {
              city: formData.city,
              street: formData.street
            },
            email: formData.email,
            username: formData.username,
            password: formData.password,
            name: {
              firstname: formData.firstname,
              lastname: formData.lastname
            },
            phone: formData.phone,
            role: formData.role
          })
        })
        .then(response => response.json())
        .then(data => {
          toast.success("Registration successful!");
          setTimeout(() => {
            navigate('/login'); // Redirect to login page after successful registration
          }, 2000); // Delay to allow the user to see the success message
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error("Registration failed!");
        });
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Error checking existing users!");
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group> */}
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default RegistrationForm;
