import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './style/AdminSideBar.css'; // Import CSS file

function AdminSideBar() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);

  const toggleProducts = () => setShowProducts(!showProducts);
  const toggleCategories = () => setShowCategories(!showCategories);
  const toggleCustomers = () => setShowCustomers(!showCustomers);
  const toggleBlogs = () => setShowBlogs(!showBlogs);

  return (
    <Container>
      <ul className='sidebar-list list-unstyled'>
        <li className='sidebar-list-item'>
          <Link to="/dashboard" className='d-flex align-items-center'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <div onClick={toggleProducts} className='d-flex align-items-center'>
            <BsFillArchiveFill className='icon' /> Products
          </div>
          {showProducts && (
            <ul className='submenu list-unstyled'>
              <li><Link to="/manage/product/view" style={{fontSize: "13px"}}>Manage Products</Link></li>
              <li><Link to="/manage/product/add" style={{fontSize: "13px"}}>Add Product</Link></li>
            </ul>
          )}
        </li>
        
        <li className='sidebar-list-item'>
          <div onClick={toggleCategories} className='d-flex align-items-center'>
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </div>
          {showCategories && (
            <ul className='submenu list-unstyled'>
              <li><Link to="/manage/categories/view" style={{fontSize: "13px"}}>Manage Categories</Link></li>
              <li><Link to="/manage/categories/add" style={{fontSize: "13px"}}>Create</Link></li>
            </ul>
          )}
        </li>
        
        <li className='sidebar-list-item'>
          <div onClick={toggleCustomers} className='d-flex align-items-center'>
            <BsPeopleFill className='icon' /> Customers
          </div>
          {showCustomers && (
            <ul className='submenu list-unstyled'>
              <li><Link to="/manage/customers/view" style={{fontSize: "13px"}}>Manage Customers</Link></li>
              <li><Link to="/manage/customers/add" style={{fontSize: "13px"}}>Add Customer</Link></li>
            </ul>
          )}
        </li>
        
        <li className='sidebar-list-item'>
          <div onClick={toggleBlogs} className='d-flex align-items-center'>
            <BsListCheck className='icon' /> Blogs
          </div>
          {showBlogs && (
            <ul className='submenu list-unstyled'>
              <li><Link to="/manage/blogs" style={{fontSize: "13px"}}>View Blogs</Link></li>
              <li><Link to="/manage/blogs/add" style={{fontSize: "13px"}}>Add Blog</Link></li>
            </ul>
          )}
        </li>
        
        <li className='sidebar-list-item'>
          <a href="" className='d-flex align-items-center'>
            <BsMenuButtonWideFill className='icon' /> Profit
          </a>
        </li>
        
        <li className='sidebar-list-item'>
          <a href="" className='d-flex align-items-center'>
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
      </ul>
    </Container>
  );
}

export default AdminSideBar;
