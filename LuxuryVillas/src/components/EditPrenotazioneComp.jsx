import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updatePrenotazione } from '../redux/reducers/prenotazioniSlice';

const EditPrenotazioneComp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { lista } = useSelector((state) => state.prenotazioni);

  const [formData, setFormData] = useState({
    dataInizio: '',
    dataFine: '',
  });

  useEffect(() => {
    const prenotazione = lista.find((p) => p.id === parseInt(id));
    if (prenotazione) {
      setFormData({
        dataInizio: prenotazione.dataInizio,
        dataFine: prenotazione.dataFine,
      });
    }
  }, [id, lista]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePrenotazione({ id, formData, token }));
    navigate('/prenotazioni');
  };

  return (
    <Container className="editPrenotazioneContainer mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="homeH5 text-center py-3 mb-4">Modifica Prenotazione</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDataInizio">
              <Form.Label><strong>Data check-in</strong></Form.Label>
              <Form.Control
                type="date"
                value={formData.dataInizio}
                onChange={(e) => setFormData({ ...formData, dataInizio: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDataFine">
              <Form.Label><strong>Data check-out</strong></Form.Label>
              <Form.Control
                type="date"
                value={formData.dataFine}
                onChange={(e) => setFormData({ ...formData, dataFine: e.target.value })}
                required
              />
            </Form.Group>

            <Button className="btnVedi mt-3" variant="transparent" type="submit">
              Salva Modifiche
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPrenotazioneComp;
