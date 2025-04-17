import React, { useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VillaCardComponent = ({ id, nomeVilla, localita, imgCopertina, onDelete }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const ruolo = useSelector((state) => state.auth.ruolo);

  const isAuthenticated = !!token;
  const isAdmin = ruolo === "Admin";

  const [showToast, setShowToast] = useState(false);

  const handlePrenotaClick = () => {
    setShowToast(true);
    setTimeout(() => {
      navigate(`/prenota/${id}`);
    }, 3500);
  };

  return (
    <>
      <Card>
        <Card.Img variant="top" src={imgCopertina} alt={`Immagine di ${nomeVilla}`} />
        <Card.Body>
          <Card.Title className="homeH5">{nomeVilla}</Card.Title>
          <p>{localita}</p>

          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => navigate(`/Ville/${id}`)}
          >
            Dettagli
          </Button>

          {isAuthenticated && !isAdmin && (
            <Button
              variant="outline-success"
              size="sm"
              className="me-2"
              onClick={handlePrenotaClick}
            >
              Prenota
            </Button>
          )}

          {!isAuthenticated && (
            <p className="text-muted small mt-2">Effettua il login per prenotare</p>
          )}

          {isAdmin && (
            <>
              <Button
                variant="warning"
                size="sm"
                className="ms-2"
                onClick={() => navigate(`/admin/modifica-villa/${id}`)}
              >
                Modifica
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => onDelete(id)}
              >
                Elimina
              </Button>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Toast di conferma */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={1200}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Prenotazione</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Reindirizzamento alla prenotazione in corso…
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default VillaCardComponent;
