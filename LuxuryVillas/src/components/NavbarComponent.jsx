import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    // Bootstrap init
  }, []);

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isHome ? 'navbar-transparent' : 'bg-dark'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center ms-3" to="/">
          <img src="logo.png" alt="Logo" style={{ height: '12vh' }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse align-items-center justify-content-end me-4" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ville">Ville</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chi-siamo">Chi Siamo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/prenotazioni">Prenotazioni</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
