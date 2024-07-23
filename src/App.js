import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Row, Col } from "react-bootstrap";
import {  Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/Home";
import Product from "./component/Product";
import ProductDetail from "./component/ProductDetail";
import Login from "./component/Login";
import Profile from "./component/Profile";
import { CartProvider } from "./component/CartContext";
import Navbar from "./component/common/Navbar";
import Cart from "./component/Cart";
import Verify from "./component/common/Verify";
import Success from "./component/common/Success";
import FailTransaction from "./component/common/FailTransaction";
import AdminHome from "./component/common/AdminHome";

import AdminRoute from './component/AdminRoute';
import AdminCreateBlog from './component/Admin/AdminCreateBlog';
import BlogList from './component/BlogList';
import BlogDetail from './component/BlogDetail';

import AddProduct from "./component/AddProduct";
import ProductList from "./component/ProductList";
import EditProduct from "./component/EditProduct";
import AddCategory from "./component/AddCategory";
import CategoryList from "./component/CategoryList";
import EditCategory from "./component/EditCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserList from "./component/common/UserList";
import UserProfile from "./component/common/UserProfile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const noNavbarPaths = ["/login", "/profile"];

  return (
      <CartProvider>
        {!noNavbarPaths.includes(location.pathname) && (

          <Navbar
            user={user}
            setUser={setUser}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        <Row>
          <Col xs={12} sm={12} md={12}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/products/:id" element={<ProductDetail user={user} isAuthenticated={isAuthenticated} />}/>
              <Route path="/login"  element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/verify" element={<Verify />} />
              <Route path="/success" element={<Success />} />
              <Route path="/fail" element={<FailTransaction />} />

              <Route path="/dashboard" element={<AdminRoute Component={AdminHome} />}/>
              <Route path="/manage/product" element={<AdminRoute Component={ProductList} />}/>
              <Route path="/manage/add-product" element={<AdminRoute Component={AddProduct} />}/>
              <Route path="/manage/product/edit/:id" element={<AdminRoute Component={EditProduct} />}/>
              <Route path="/manage/categories" element={<AdminRoute Component={CategoryList} />}/>
              <Route path="/manage/add-category" element={<AdminRoute Component={AddCategory} />}/>
              <Route path="/manage/category/edit/:id" element={<AdminRoute Component={EditCategory} />}/>
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:blogId" element={<BlogDetail />} />
              <Route path="/manage/blogs/add" element={<AdminRoute Component={AdminCreateBlog} />} />
              <Route path="/manage/blogs" element={<AdminRoute Component={AdminManageBlog}/>}/>            

            </Routes>
            <ToastContainer />
          </Col>
        </Row>

      </CartProvider>

  );
}

export default App;
