import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsComp = () => {
  return (
    <Container fluid className="AboutUs py-4 px-3 px-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="text-center">
          <h1 className="aboutUsTitle pt-0 pb-2">Chi Siamo</h1>
          <hr className="separateHr mt-2 mb-4" />
          <p className="my-2">
            Siamo specializzati nel proporre esperienze uniche in ville di lusso selezionate con cura.
            La nostra missione è offrire soggiorni esclusivi, comfort impareggiabile e un servizio su misura
            per rendere ogni vacanza indimenticabile.
          </p>
          <p className="my-2">
            Il nostro obiettivo principale è raccogliere in un unico servizio le migliori ville di lusso della Costa Smeralda, da sempre meta esclusiva per il jet-set internazionale.
          </p>
          <p className="my-2">
            Le nostre ville sono selezionate con cura per garantire il massimo del comfort e della privacy, grazie a un servizio di concierge dedicato e altamente professionale.
            Ogni villa è selezionata con cura dal nostro eccellente Team locale, attraverso un accurato processo di selezione; soggiornare nelle nostre proprietà garantisce a ciascun ospite uno standard di altissima qualità con un team dedicato, assistenza costante ed efficace per ogni esigenza.
          </p>
          <p className="my-2">
            Da anni ci occupiamo di affitti di lusso e abbiamo una profonda conoscenza del mercato immobiliare della Costa Smeralda, uno dei luoghi più spettacolari di tutta la Sardegna.
            Conosciamo il nostro territorio e le sue bellezze, e per questo siamo in grado di offrire il meglio per le vostre esperienze.
          </p>
          <p className="my-2">
            Da sempre scegliamo la Costa Smeralda come cuore pulsante della nostra attività, per le innumerevoli bellezze naturali, le spiagge incantevoli e il mare cristallino, ma anche per l'esclusività della sua vita notturna e dei suoi eventi mondani.
          </p>
          <hr className="separateHr mt-4 mb-4" />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} className="text-center mb-4">
          <h5 className="homeH5">Porto Cervo</h5>
          <p>Via dei Pescatori, 12</p>
        </Col>
        <Col xs={12} sm={6} md={4} className="text-center mb-4">
          <h5 className="homeH5">Porto Rafael</h5>
          <p>Via delle Conghiglie, 46</p>
        </Col>
        <Col xs={12} sm={12} md={4} className="text-center mb-4">
          <h5 className="homeH5">Olbia</h5>
          <p>Via del Mare, 89</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsComp;
