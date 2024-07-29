import React from 'react';
import '../common/style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-title">Commerce Theme</h2>
          <form className="footer-form">
            <input type="email" placeholder="Enter Your Email*" required />
            <button type="submit">Subscribe</button>
          </form>
          <p className="footer-text">Get monthly updates and free resources.</p>
        </div>
        
        <div className="footer-column">
          <h3>MOBIRISE</h3>
          <p>Phone: +1 (0) 000 0000 001</p>
          <p>Email: yourmail@example.com</p>
          <p>Address:1234 Street Name City, AA 99999</p>
          <div className="social-icons">
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">YouTube</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">Google+</a>
            <a href="#" className="social-icon">Behance</a>
          </div>
        </div>
        
        <div className="footer-column">
          <h3>RECENT NEWS</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Get In Touch</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>LINKS</h3>
          <ul>
            <li><a href="#">Website Builder</a></li>
            <li><a href="#">Download for Mac</a></li>
            <li><a href="#">Download for Windows</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;