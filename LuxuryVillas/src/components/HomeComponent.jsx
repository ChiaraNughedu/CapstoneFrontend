import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import VillaCardComponent from "./VillaCardComponent";
import LogoutComp from "./LogoutComp";
import NavbarComponent from "./NavbarComponent";

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
      > <NavbarComponent />
        <h1 className="BVtitle display-3 mb-4">Boutique Villas</h1>
        <h4 className="lead">Costa Smeralda</h4>
        
      </Row>

      <Row className="second-row py-5 mx-3 align-items-center text-center text-md-start">
        
        <Col md={4} className="mt-3 mb-md-0 d-flex justify-content-center">
        <img src={"logo.png"} alt="Logo" style={{ height: '25vh' }} />
        </Col>
        <Col md={4}>
          <h5 className="homeH5">Esperienza Unica</h5>
          <p >
            Le nostre ville offrono un'esperienza esclusiva immersa nel cuore della Costa Smeralda.
          </p>
        </Col>
        <Col md={4}>
          <h5 className="homeH5">Servizi Personalizzati</h5>
          <p >
            Dal concierge privato alle esperienze su misura, ogni soggiorno è progettato per te.
          </p>
        </Col>
      </Row>

      <Row>
         <h2 className="scopriTitle text-center text-uppercase ">scopri la Costa Smeralda</h2>
      </Row>

      <Row className="third-row py-5 mx-3">
          <Col md={4}>
            <h4 className="homeH5 text-center pb-3">Splendide Spiagge</h4>
            <Image
              src="spiaggia.jpg"
              fluid
              rounded
            />
            <p className="mt-4 ">
              In Sardegna troverete le spiagge più belle del Mar Mediterraneo, tanto che alcuni hanno denominato l'isola come i Caraibi Europei. Se l'avete già vista di persona, di sicuro ci tornerete e nin vorrete più andare via.
            </p>
          </Col>
          <Col md={4}>
            <h4 className="homeH5 text-center pb-3">Mare cristallino</h4>
            <Image
              src="mare.jpg"
              fluid
              rounded
            />
            <p className="mt-4">
              A pochi minuti da Porto Cervo troverete l’arcipelago della Maddalena con tante splendide baie e acqua cristallina. L'atmosfera perfetta per rilassare la mente e godere della natura incontaminata.
            </p>
          </Col>
          <Col md={4}>
            <h4 className="homeH5 text-center pb-3">Alloggi di lusso</h4>
            <Image
              src="alloggi.jpg"
              fluid
              rounded
            />
            <p className="mt-4">
              La Costa Smeralda offre molte sistemazioni di lusso e vi garantiscono il soggiorno che avete sempre sognato. Non importa s preferite una lussuosa villa privata o uno dei più famosi hotel a cinque stelle.
            </p>
          </Col>
        </Row>

        <Row className="third-row py-5 mx-3">
          <Col md={4}>
            <h4 className="homeH5 text-center pb-3">Shopping esclusivo</h4>
            <Image
              src="boutiquedg.jpg"
              fluid
              rounded
            />
            <p className="mt-4">
              Porto Cervo è il paradiso dello shopping di lusso e vi offre le più esclusive e prestigiose griffe di tutto il mondo. Non dimenticate di visitare le boutique di Dolce & Gabbana, Hermés, Gucci e Prada, solo per citarne alcune. Concedetevi un po' di shooping sulla suggestiva Piazzetta e godetevi l'incredibile vista sul mare.
            </p>
          </Col>
          <Col md={4}>
            <h4 className="homeH5 text-center pb-3">Cene esclusive</h4>
            <Image
              src="cena2.jpg"
              fluid
              rounded
            />
            <p className="mt-4">
              Per concludere in bellezza le vostre serate, potete scegliere tra un'ampia varietà di ristoranti; Ci sono tante e diverse possibilità di scelta tra cucina internazionale, cucina tipica, ristoranti fusion o pesce fresco locale. Ampia scelta anche in fatto di location: preferite cenare direttamente sul mare, in una terrazza dalla vista mozzafiato, o in angoli più riservati?
            </p>
          </Col>
          <Col md={4}>
            <h4 className="homeH5 text-center pb-3">Locali esclusivi</h4>
            <Image
              src="billionaire.jpg"
              fluid
              rounded
            />
            <p className="mt-4">
            La Costa Smeralda offre una vibrante vita notturna, con locali esclusivi e feste indimenticabili. Oltre al più famoso Billionaire, il Phi Beach vi accoglierà per un indimenticabile aperitivo sul mare con vista sui più bei tramonti della Sardegna. Un'altra valida e superba alternativa è il Ritual, uno dei locali storici della Costa Smeralda che si distingue per la sua architettura unica ed inconfondibile.
            </p>
          </Col>
        </Row>

      <Row className="py-5 mx-3 ">
        <h2 className="evidenzaVille text-center text-uppercase">In Evidenza</h2>
        {ville.map((villa) => (
          <Col key={villa.Id} md={4} className="mb-4">
            <VillaCardComponent
              id={villa.Id}
              nomeVilla={villa.nomeVilla}
              imgCopertina={villa.imgCopertina}
            />
          </Col>
        ))}
        <Col xs={12} className="mt-4 text-center">
          <Link to="/Ville" className="btnVedi btn">
            Vedi tutte le ville
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeComponent;
