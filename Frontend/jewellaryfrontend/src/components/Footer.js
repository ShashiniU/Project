import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">GemMarket</h3>
          <p className="footer-text">The premier marketplace for authentic gemstones. Buy and sell with confidence.</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listings">Gemstones</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact">
            <li>Email: info@gemmarket.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Gem Street, Crystal City</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-text">Subscribe to get updates on new gemstones</p>
          <form className="footer-form">
            <input type="email" placeholder="Your email" className="footer-input" />
            <button type="submit" className="footer-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} GemMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

