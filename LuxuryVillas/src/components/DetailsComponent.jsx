import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Modal,
} from "react-bootstrap";

const DetailsComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`https://localhost:7141/api/Ville/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento");
        return res.json();
      })
      .then((data) => {
        setVilla(data);
      })
      .catch((err) => console.error("Errore nel recupero dettagli:", err));
  }, [id]);

  if (!villa) return <p className="text-center mt-5">Caricamento in corso...</p>;

  const immaginiSecondarie = [
    villa.immagine1,
    villa.immagine2,
    villa.immagine3,
    villa.immagine4,
    villa.immagine5,
    villa.immagine6,
  ].filter(Boolean);

  const openModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % immaginiSecondarie.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + immaginiSecondarie.length) % immaginiSecondarie.length);
  };

  return (
    <Container className="py-5">
      <Button variant="outline-dark mb-4" onClick={() => navigate(-1)}>
        ← Torna Indietro
      </Button>

      <Row>
        <Col md={6}>
          {/* Immagine copertina fissa */}
          <Image
            src={villa.imgCopertina}
            alt="Copertina"
            fluid
            className="mb-3 rounded shadow"
          />
        </Col>

        <Col md={6}>
          <h2>{villa.nomeVilla}</h2>
          <h5 className="text-muted text-start">{villa.localita} <span className="text-end"> {villa.prezzo.toLocaleString("it-IT", {
              style: "currency",
              currency: "EUR",
            })} </span></h5>
          <p>{villa.descrizione}</p>
          <h4 className="text-success">
            
          </h4>
        </Col>
      </Row>

      <Row>
           {/* Miniature: aprono direttamente la modal */}
           <div className="d-flex flex-wrap gap-2">
            {immaginiSecondarie.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`thumb-${index}`}
                width={200}
                height={130}
                onClick={() => openModal(index)}
                className="border rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            ))}
          </div>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="350px">
        <Modal.Body className="text-center">
          <Image src={immaginiSecondarie[currentIndex]} fluid className="modalImg" />
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={prevImage}>← Indietro</Button>
          <Button variant="secondary" onClick={nextImage}>Avanti →</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DetailsComponent;
