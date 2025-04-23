import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
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
    window.scrollTo(0, 0);
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

  
  const villeFiltrate =
    categoriaFiltro === "Tutte"
      ? ville
      : ville.filter((villa) => villa.nomeCategoria === categoriaFiltro);

  return (
    <Container className="pb-5">
      <Row>
        <Col className="text-center py-2">
        <h2 className="villeTitle">{isAdmin ? "Gestione Ville" : "Le Nostre Ville"}</h2>
        </Col>
      </Row>

    <Row className="d-flex justify-content-between align-items-center mt-4 mb-5">
       <Col xs={6} md={9}>
        <Button className="btnVedi" variant="transparent"
           onClick={() => {
             navigate(-1);
             window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >Torna Indietro
        </Button>
       </Col>

       <Col xs={6} md={3} className="text-end">
  <Dropdown>
    <Dropdown.Toggle variant="secondary" className="btnVediSelect">
      {categoriaFiltro === "Tutte" ? "Tutte le Categorie" : categoriaFiltro}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setCategoriaFiltro("Tutte")}>Tutte le Categorie</Dropdown.Item>
      <Dropdown.Item onClick={() => setCategoriaFiltro("Villa")}>Villa</Dropdown.Item>
      <Dropdown.Item onClick={() => setCategoriaFiltro("Appartamento")}>Appartamento</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Col>

    </Row>
      

    

    <Row className="mt-4">
  {/* Colonna sinistra con testo */}
  <Col md={3}>
  <div className="bordinoGold h-100 pe-3" style={{ height: "100%", minHeight: "100%" }}>
    <p className="villaPlace"><strong>Scopri le nostre ville e appartamenti esclusivi.</strong></p>
      <p className="villaPlace">
        Boutique Villas seleziona le migliori proprietà della Costa Smeralda per offrirti il miglior soggiorno di lusso. 
        Ogni struttura è stata scelta con cura per garantire un'esperienza unica e indimenticabile.
        <br />
        Le nostre ville sono dotate di tutti i comfort e servizi per rendere il tuo soggiorno perfetto.
        Ogni villa è unica e offre un'atmosfera esclusiva, con arredi eleganti e moderni. Tutte le proprietà sono circondate da ampi spazi esterni, piscine private e giardini curati.
        I nostri servizi includono concierge, chef privati e personale dedicato per soddisfare ogni tua esigenza.

      </p>
    </div>
  </Col>

 
  {/* Colonna destra con le ville */}
  <Col md={9}>
    <Row className=" justify-content-between">
      {villeFiltrate.map((villa) => (
        <Col key={villa.id} md={6} className="mb-4">
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
  </Col>
</Row>

    </Container>
  );
};

export default VilleComponent;
