import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Luxury Villas</h5>
            <p>&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Contatti</h5>
            <p>Email: info@luxuryvillas.com</p>
            <p>Telefono: +39 123 456 7890</p>
          </div>
          <div className="col-md-4">
            <h5>Seguici</h5>
            <a href="#" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-light">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
