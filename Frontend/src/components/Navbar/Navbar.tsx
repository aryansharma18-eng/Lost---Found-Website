import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  PlusCircle,
  LayoutGrid,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Brand */}

        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <div className="brand-icon">
            <Search
              size={21}
              strokeWidth={2.5}
            />
          </div>

          <div className="brand-text">

            <span className="brand-title">
              Lost<span>&</span>Found
            </span>

            <span className="brand-tagline">
              Find what matters
            </span>

          </div>
        </Link>


        {/* Desktop Navigation */}

        <nav className="desktop-navigation">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/browse"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Browse Reports
          </NavLink>


          <NavLink
            to="/lost"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Lost Items
          </NavLink>


          <NavLink
            to="/found"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Found Items
          </NavLink>


          <NavLink
            to="/lost"
            className="nav-report-button"
          >
            <PlusCircle size={17} />
            Report Item
          </NavLink>

        </nav>


        {/* Mobile Menu Button */}

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </div>


      {/* Mobile Navigation */}

      <div
        className={`mobile-navigation ${
          menuOpen
            ? "mobile-navigation-open"
            : ""
        }`}
      >

        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/browse"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <LayoutGrid size={18} />
          Browse Reports
        </NavLink>


        <NavLink
          to="/lost"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Lost Items
        </NavLink>


        <NavLink
          to="/found"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Found Items
        </NavLink>


        <NavLink
          to="/lost"
          onClick={closeMenu}
          className="mobile-report-button"
        >
          <PlusCircle size={18} />
          Report an Item
        </NavLink>

      </div>

    </header>
  );
};

export default Navbar;