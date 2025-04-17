import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VillaCardComponent = ({ id, nomeVilla, localita, imgCopertina, onEdit, onDelete }) => {
  const token = useSelector((state) => state.auth.token);
  const ruolo = useSelector((state) => state.auth.ruolo);

  const isAuthenticated = !!token;
  const isAdmin = ruolo === "Admin";

  return (
    <Card>
      <Card.Img variant="top" src={imgCopertina} alt={`Immagine di ${nomeVilla}`} />
      <Card.Body>
        <Card.Title>{nomeVilla}</Card.Title>
        <p>{localita}</p>

        <Link to={`/Ville/${id}`} className="btn btn-outline-primary btn-sm me-2">
          Dettagli
        </Link>

        {isAuthenticated && !isAdmin && (
          <Link to={`/prenota/${id}`} className="btn btn-outline-success btn-sm me-2">
            Prenota
          </Link>
        )}

        {!isAuthenticated && (
          <p className="text-muted small">Effettua il login per prenotare</p>
        )}

        {isAdmin && (
          <>
            <Link to={`/admin/modifica-villa/${id}`}>
              <Button variant="warning" className="ms-2 btn-sm">
                Modifica
              </Button>
            </Link>
        
            <Button
              variant="danger"
              className="ms-2 btn-sm"
              onClick={() => onDelete(id)}
            >
              Elimina
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default VillaCardComponent;
