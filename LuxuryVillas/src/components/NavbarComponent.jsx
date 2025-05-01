import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
  
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click(); 
    }
  }, [location.pathname]);
  

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" collapseOnSelect className={isHome ? 'navbar-transparent' : 'bg-dark'}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center ms-3">
          <img src="logo.png" alt="Logo" style={{ height: '12vh' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-end me-4">
  <Nav className="w-100">

    <div className="d-block d-lg-none">
      <Row className="justify-content-between">
        <Col xs={6}>
          <Nav.Link className="pb-0" as={Link} to="/">Home</Nav.Link>
          <Nav.Link className="pb-0" as={Link} to="/ville">Ville</Nav.Link>
          <Nav.Link className="pb-0" as={Link} to="/chi-siamo">Chi Siamo</Nav.Link>
        </Col>
        <Col xs={6} className="text-end">
          <Nav.Link className="pb-0" as={Link} to="/blog">Blog</Nav.Link>
          <Nav.Link className="pb-0" onClick={handleLoginClick}>Login</Nav.Link>
          <Nav.Link className="pb-0" as={Link} to="/prenotazioni">Prenotazioni</Nav.Link>
        </Col>
      </Row>
    </div>

    <div className="d-none d-lg-flex ms-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/ville">Ville</Nav.Link>
      <Nav.Link as={Link} to="/chi-siamo">Chi Siamo</Nav.Link>
      <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
      <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
      <Nav.Link as={Link} to="/prenotazioni">Prenotazioni</Nav.Link>
    </div>
  </Nav>
</Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
