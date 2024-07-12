import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Product from './component/Product';
import ProductDetail from './component/ProductDetail';
import Login from './component/Login';
import Profile from './component/Profile';
import { CartProvider } from './component/CartContext';
import CustomNavbar from './component/common/Navbar';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CustomNavbar />
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Col>
        </Row>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
