import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsComp = () => {
  return (
    <Container fluid className="AboutUs py-4">

      <Row className="justify-content-center">
        <Col md={10} lg={8} className="text-center">
          <h1 className="aboutUsTitle pt-0 pb-2">Chi Siamo</h1>
          <p className=" my-1">
            Siamo specializzati nel proporre esperienze uniche in ville di lusso selezionate con cura.
            La nostra missione è offrire soggiorni esclusivi, comfort impareggiabile e un servizio su misura
            per rendere ogni vacanza indimenticabile.
          </p>
          <p className="my-1">
            Il nostro obiettivo principale è raccogliere in un unico servizio le migliori ville di lusso della Costa Smeralda, da sempre meta esclusiva per il jet-set internazionale.
          </p>
          <p className=" my-1">
            Le nostre ville sono selezionate con cura per garantire il massimo del comfort e della privacy, grazie a un servizio di concierge dedicato e altamente professionale.
            Ogni villa è selezionata con cura dal nostro eccellente Team locale, attraverso un accurato processo di selezione; soggiornare nelle nostre proprietà garantisce a ciascun ospite uno standard di altissima qualità con un team dedicato, assistenza costante ed efficace per ogni esigenza.
          </p>
          <p className="my-1">
            Da anni ci occupiamo di affitti di lusso e abbiamo una profonda conoscenza del mercato immobiliare della Costa Smeralda, uno dei luoghi più spettacolari di tutta la Sardegna.
            Conosciamo il nostro territorio e le sue bellezze, e per questo siamo in grado di offrire il meglio per le vostre esperienze.
          </p>
          <p className=" my-1">
            Da sempre scegliamo la Costa Smeralda come cuore pulsante della nostra attività, per le innumerevoli bellezze naturali, le spiagge incantevoli e il mare cristallino, ma anche per l'esclusività della sua vita notturna e dei suoi eventi mondani.
          </p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h2 className="aboutUsTitle py-4">Le Nostre Sedi</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={4} className="text-center mb-4">
          <h5 className="homeH5">Porto Cervo</h5>
          <p >Via dei Pescatori, 12</p>
        </Col>
        <Col md={4} className="text-center mb-4">
          <h5 className="homeH5">Porto Rafael</h5>
          <p >Via delle Conghiglie, 46</p>
        </Col>
        <Col md={4} className="text-center mb-4">
          <h5 className="homeH5">Olbia</h5>
          <p>Via del Mare, 89</p>
        </Col>
      </Row>

    </Container>
  );
};

export default AboutUsComp;
