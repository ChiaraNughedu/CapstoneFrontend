import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  return (
      <Container fluid={true}>
        <Row className="footer mx-3 pb-2 justify-content-between ">
          <Col md={5} className="mb-2 mb-md-0">
            <h5 className="footerH5 text-uppercase">Boutique Villas</h5>
            <p className="footerLink"> <a href="#">Privacy Policy</a></p>
            
            <p className="footerLink"><a href="#">Affitta la tua Villa</a> </p>
            <p className="footerLink"> <a href="#">Info utili</a></p>

          </Col>
          <Col md={5} className="mb-2 mb-md-0">
            <h5 className="footerH5 text-uppercase">Contatti</h5>
            <p className="footerLink"><a href="#">Email: info@luxuryvillas.com</a> </p>
            <p>Telefono: +39 123 456 7890</p>
          </Col>
          <Col md={2}>
            <h5 className="footerH5 text-uppercase">Seguici</h5>
            <a href="#" className="text-dark me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-dark me-3">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-dark">
              <i className="bi bi-twitter-x"></i>
            </a>
          </Col>
        </Row>
  
      </Container>
   
  );
};

export default FooterComponent;