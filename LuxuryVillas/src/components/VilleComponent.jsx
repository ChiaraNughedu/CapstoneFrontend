import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import VillaCardComponent from "../components/VillaCardComponent";

const VilleComponent = () => {
  const [ville, setVille] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const ruolo = useSelector((state) => state.auth.ruolo);
  const isAdmin = ruolo === "Admin";

  const fetchVille = () => {
    fetch("https://localhost:7141/api/Ville", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => setVille(data))
      .catch((err) => console.error("Errore nel caricamento delle ville:", err));
  };

  useEffect(() => {
    fetchVille();
  }, []);

  const handleEdit = (id) => {
    console.log("Modifica villa con ID:", id);
    // navigate(`/admin/modifica-villa/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa villa?")) {
      fetch(`https://localhost:7141/api/Ville/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            fetchVille(); // aggiorna la lista
          } else {
            console.error("Errore durante l'eliminazione");
          }
        })
        .catch((err) =>
          console.error("Errore nella richiesta di eliminazione:", err)
        );
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">
        {isAdmin ? "Gestione Ville" : "Le Nostre Ville"}
      </h2>
      <Row>
        {ville.map((villa) => (
          <Col key={villa.id} md={4} className="mb-4">
            <VillaCardComponent
              id={villa.id}
              nomeVilla={villa.nomeVilla}
              imgCopertina={villa.imgCopertina}
              localita={villa.localita}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VilleComponent;
