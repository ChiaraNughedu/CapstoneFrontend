import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import VillaCardComponent from "./VillaCardComponent";
import LogoutComp from "./LogoutComp";

const HomeComponent = () => {
  const [ville, setVille] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7141/api/Ville") // 🔓 NESSUN token
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento");
        return res.json();
      })
      .then((data) => {
        // Seleziona 3 ville casuali
        const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setVille(randomThree);
      })
      .catch((error) => {
        console.error("Errore nel recupero ville:", error);
      });
  }, []);

  return (
    <Container fluid>
      <Row className="hero-section p-0 d-flex flex-column align-items-center text-center text-white"
      > 
        <h1 className="BVtitle display-3 mb-3">Boutique Villas</h1>
        <p className="lead mt-0 pt-0">Costa Smeralda</p>
        <h2 className="mt-5 py-5">A Luxury Retreat</h2>
      </Row>

      <Row className="second-row py-4 align-items-center text-center text-light text-md-start">
        <Col md={4} className="mt-3 mb-md-0 d-flex justify-content-center">
        <img src={"logo.png"} alt="Logo" style={{ height: '25vh' }} />
        </Col>
        <Col md={4}>
          <h5 className="homeH5">Esperienza Unica</h5>
          <p>
            Le nostre ville offrono un'esperienza esclusiva immersa nel cuore della Costa Smeralda.
          </p>
        </Col>
        <Col md={4}>
          <h5 className="homeH5">Servizi Personalizzati</h5>
          <p>
            Dal concierge privato alle esperienze su misura, ogni soggiorno è progettato per te.
          </p>
        </Col>
      </Row>

      <Row className="py-5 text-center">
        <h2 className="mb-4">In Evidenza</h2>
        {ville.map((villa) => (
          <Col key={villa.Id} md={4} className="mb-4">
            <VillaCardComponent
              id={villa.Id}
              nomeVilla={villa.nomeVilla}
              imgCopertina={villa.imgCopertina}
            />
          </Col>
        ))}
        <Col xs={12} className="mt-4">
          <Link to="/Ville" className="btn btn-outline-dark">
            Vedi tutte le ville
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeComponent;
