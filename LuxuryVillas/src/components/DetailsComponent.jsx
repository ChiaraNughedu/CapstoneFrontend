import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  const token = useSelector((state) => state.auth.token);
  const ruolo = useSelector((state) => state.auth.ruolo);
  const isAuthenticated = !!token;
  const isAdmin = ruolo === "Admin";

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button className="btnVedi" variant="transparent" onClick={() => navigate(-1)}>
          Torna Indietro
        </Button>

        {!isAdmin && (
          isAuthenticated ? (
            <Button className="btnVedi" variant="transparent" onClick={() => navigate(`/prenota/${id}`)}>
              Prenota ora
            </Button>
          ) : (
            <Button className="btnVedi" variant="transparent" disabled>
              Effettua il login per prenotare
            </Button>
          )
        )}
      </div>

      
      <Row className="text-center">
        <h2 className="detailsNameVilla">{villa.nomeVilla}</h2>
      </Row>
      <hr className="mt-0 mb-4"/>
      <Row>
      <Col md={6}>
          
          <p className="villaDescrizione me-3">{villa.descrizione}</p>

    
        </Col>

        <Col md={6}>
          <Image
            src={villa.imgCopertina}
            alt="Copertina"
            fluid
            className="rounded shadow mt-2"
          />
        </Col>


      </Row>

      <hr className="mt-4 mb-4" />
     
      <Row className="mt-2">
            <Col md={6}>
            <h5 className="villaLocalita mt-3 text-start">
            {villa.localita}</h5>
            </Col>

            <Col md={6}>
            <p className="prezzoText text-end py-0 my-0">Prezzo per notte</p>
            <h5 className="villaPrezzo mt-1 py-0 float-end">
              {villa.prezzo.toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })}
              </h5>
              </Col>
          </Row>
      
          <hr className="mt-4 mb-4" />

      <Row className="mt-4">
        <div className="d-flex flex-wrap justify-content-between gap-3 float-end">
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
        <Modal.Body className="text-center">
          <Image src={immaginiSecondarie[currentIndex]} fluid className="modalImg" />
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button className="btnVedi" variant="transparent" onClick={prevImage}>Indietro</Button>
          <Button className="btnVedi" variant="transparent" onClick={nextImage}>Avanti</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DetailsComponent;
