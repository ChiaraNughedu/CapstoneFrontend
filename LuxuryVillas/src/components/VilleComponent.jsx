import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import VillaCardComponent from "../components/VillaCardComponent";

const VilleComponent = () => {
  const [ville, setVille] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Tutte");

  const token = useSelector((state) => state.auth.token);
  const ruolo = useSelector((state) => state.auth.ruolo);

  const isAdmin = ruolo === "Admin";
  const navigate = useNavigate();

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

  // Filtra per categoria selezionata
  const villeFiltrate =
    categoriaFiltro === "Tutte"
      ? ville
      : ville.filter((villa) => villa.nomeCategoria === categoriaFiltro);

  return (
    <Container className="pb-5">
      <Row>
        <Col className="text-center py-2">
        <h2 className=" text-uppercase scopriTitle">{isAdmin ? "Gestione Ville" : "Le Nostre Ville"}</h2>
        </Col>
      </Row>

    <Row className="d-flex justify-content-between align-items-center mt-4 mb-5">
       <Col md={9}>
        <Button className="btnVedi" variant="transparent"
           onClick={() => {
             navigate(-1);
             window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >Torna Indietro
        </Button>
       </Col>

       <Col md={3}>
        <Form.Group controlId="filtroCategoria" className=""> 
           <Form.Select
               className="btnVediSelect"
               value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="Tutte">Tutte le Categorie</option>
              <option value="Villa">Villa</option>
              <option value="Appartamento">Appartamento</option>
           </Form.Select>
        </Form.Group>
      </Col>
    </Row>
      

    

      <Row>
        {villeFiltrate.map((villa) => (
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
