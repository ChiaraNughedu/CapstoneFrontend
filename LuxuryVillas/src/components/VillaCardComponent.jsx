import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VillaCardComponent = ({ id, nomeVilla, localita, imgCopertina, onDelete }) => {
  const navigate = useNavigate();
  //const token = useSelector((state) => state.auth.token);
  const ruolo = useSelector((state) => state.auth.ruolo);

  //const isAuthenticated = !!token;
  const isAdmin = ruolo === "Admin";

  return (
    <Card className="villaCard">
      <Card.Img variant="top" src={imgCopertina} alt={`Immagine di ${nomeVilla}`} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title className="villaCardName">{nomeVilla}</Card.Title>
            <p className="villaPlace mb-0">{localita}</p>
          </div>
          <Button
            variant="transparent"
            size="sm"
            className="btnVediCard my-auto"
            onClick={() => navigate(`/Ville/${id}`)}
          >
            Dettagli
          </Button>
        </div>
      

        {isAdmin && (
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <Button
              variant="transparent"
              size="sm"
              className="me-2 btnVediCard"
              onClick={() => navigate(`/admin/modifica-villa/${id}`)}
            >
              Modifica
            </Button>
            <Button
              variant="transparent"
              size="sm"
              className="btnVediCard"
              onClick={() => onDelete(id)}
            >
              Elimina
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default VillaCardComponent;
