import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticoloById, updateArticolo } from "../redux/reducers/blogSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";

const EditBlogComp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articoloSingolo, loading, error } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    luogo: "",
    imageUrl: "",
    descrizione1: "",
    descrizione2: ""
  });

  useEffect(() => {
    dispatch(fetchArticoloById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (articoloSingolo) {
      setFormData({
        luogo: articoloSingolo.luogo || "",
        imageUrl: articoloSingolo.imageUrl || "",
        descrizione1: articoloSingolo.descrizione1 || "",
        descrizione2: articoloSingolo.descrizione2 || ""
      });
    }
  }, [articoloSingolo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateArticolo({ id, ...formData }))
      .unwrap()
      .then(() => navigate("/blog"))
      .catch((err) => console.error("Errore aggiornamento:", err));
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-5 text-center">Errore: {error}</Alert>;

  return (
    <Container className="mt-5 pb-5">
      <h2 className="homeH5 text-center mb-4">Modifica Articolo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="py-2"><strong>Luogo</strong></Form.Label>
          <Form.Control
            type="text"
            name="luogo"
            value={formData.luogo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="py-2"><strong>URL Immagine</strong></Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="py-2"><strong>Introduzione</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descrizione1"
            value={formData.descrizione1}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="py-2"><strong>Descrizione Completa</strong></Form.Label>
          <Form.Control
            as="textarea"
            name="descrizione2"
            rows={8}
            value={formData.descrizione2}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-5 d-flex justify-content-between">
          <Button variant="transparent" className="btnVedi" onClick={() => navigate(-1)}>
            Torna Indietro
          </Button>
          <Button type="submit" variant="transparent" className="btnVedi">
            Salva Modifiche
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditBlogComp;
