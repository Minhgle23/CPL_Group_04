import React, { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/common/Navbar';
import Product from './component/Product';
import ProductDetail from './component/ProductDetail';
import Login from './component/Login';
import Profile from './component/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      // const user = JSON.parse(storedUser);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      // setUser(user);
    }
  }, []);
  console.log(user);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
      <Row>
        <Col xs={12} sm={12} md={12}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Product />} />
            <Route path='/products/:id' element={<ProductDetail user={user} isAuthenticated={isAuthenticated}    />} />
            <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
