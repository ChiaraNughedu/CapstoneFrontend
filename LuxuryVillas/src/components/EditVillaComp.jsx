import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditVillaComp = () => {
  const { id } = useParams();  
  const [villa, setVilla] = useState({
    nomeVilla: "",
    localita: "",
    prezzo: "",
    imgCopertina: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:7141/api/Ville/${id}`)
      .then((res) => res.json())
      .then((data) => setVilla(data))
      .catch((err) => setError("Errore nel recupero della villa"));
  }, [id]);

  const handleChange = (e) => {
    setVilla({ ...villa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const res = await fetch(`https://localhost:7141/api/Ville/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(villa),
      });

      if (!res.ok) throw new Error("Errore nella modifica della villa");

      navigate("/admin/dashboard"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Modifica Villa</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome della Villa</Form.Label>
          <Form.Control
            type="text"
            name="nomeVilla"
            value={villa.nomeVilla}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Località</Form.Label>
          <Form.Control
            type="text"
            name="localita"
            value={villa.localita}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control
            type="text"
            name="prezzo"
            value={villa.prezzo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Immagine di Copertina (URL)</Form.Label>
          <Form.Control
            type="text"
            name="imgCopertina"
            value={villa.imgCopertina}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="text"
            name="descrizione"
            value={villa.descrizione}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Salva Modifiche
        </Button>
      </Form>
    </Container>
  );
};

export default EditVillaComp;
