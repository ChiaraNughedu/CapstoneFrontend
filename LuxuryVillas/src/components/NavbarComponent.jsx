import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
    <Navbar expand="lg" className={isHome ? 'navbar-transparent' : 'bg-dark'}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center ms-3">
          <img src="logo.png" alt="Logo" style={{ height: '12vh' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="align-items-center justify-content-end me-4">
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/ville">Ville</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/chi-siamo">Chi Siamo</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/prenotazioni">Prenotazioni</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
