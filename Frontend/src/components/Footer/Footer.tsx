import { Link } from "react-router-dom";
import {
  Search,
  AlertCircle,
  HeartHandshake,
  ArrowUp,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">
              <HeartHandshake size={24} strokeWidth={2.2} />
            </span>

            <span className="footer-logo-text">
              Lost<span>&</span>Found
            </span>
          </Link>

          <p className="footer-description">
            A simple and reliable platform to report lost items,
            share found items, and help them find their way back
            to their owners.
          </p>

          <div className="footer-status">
            <span className="footer-status-dot"></span>
            <span>Helping people reconnect with their belongings</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/lost">Report Lost</Link>
            </li>

            <li>
              <Link to="/found">Report Found</Link>
            </li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="footer-column">
          <h3>How It Works</h3>

          <ul>
            <li>
              <span>Report an item</span>
            </li>

            <li>
              <span>Browse reports</span>
            </li>

            <li>
              <span>Find a match</span>
            </li>

            <li>
              <span>Reconnect</span>
            </li>
          </ul>
        </div>

        {/* Action Section */}
        <div className="footer-action">
          <h3>Lost something?</h3>

          <p>
            Don't wait. Report your lost item and increase the
            chances of getting it back.
          </p>

          <Link to="/lost" className="footer-report-button">
            <AlertCircle size={18} />
            Report Lost Item
          </Link>

          <Link to="/found" className="footer-found-link">
            <Search size={17} />
            I Found Something
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © {new Date().getFullYear()} Lost & Found. All rights reserved.
          </p>

          <button
            type="button"
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;