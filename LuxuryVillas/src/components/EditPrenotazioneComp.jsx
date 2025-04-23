import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updatePrenotazione, fetchPrenotazioni } from '../redux/reducers/prenotazioniSlice';

const EditPrenotazioneComp = () => {
  const { idPrenotazione } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, ruolo } = useSelector((state) => state.auth);
  const { lista } = useSelector((state) => state.prenotazioni);


  const [formData, setFormData] = useState({
    dataInizio: '',
    dataFine: '',
  });

  useEffect(() => {
    if (!idPrenotazione) {
      console.error('ID non definito nei parametri URL');
      navigate('/prenotazioni');
      return;
    }

    const prenotazione = lista.find((p) => p.id === parseInt(idPrenotazione));
    console.log('Prenotazione trovata:', prenotazione);
    
    if (prenotazione) {
      setFormData({
        villaId: prenotazione.villaId, 
        dataInizio: prenotazione.dataInizio,
        dataFine: prenotazione.dataFine,
      });
    } else {
      console.error('Prenotazione non trovata con ID:', idPrenotazione);
      navigate('/prenotazioni');
    }
  }, [idPrenotazione, lista, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idPrenotazione) {
      console.error('ID mancante per l\'aggiornamento');
      return;
    }
    
    try {
      console.log('Invio aggiornamento per ID:', idPrenotazione, 'con dati:', formData);
      
      await dispatch(updatePrenotazione({ 
        id: parseInt(idPrenotazione), 
        formData, 
        token 
      })).unwrap();
      
      await dispatch(fetchPrenotazioni({ token, ruolo }));
      
      navigate('/prenotazioni');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della prenotazione', error);
    }
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

            <div className="d-flex justify-content-between align-items-center mt-5">
              <Button variant="transparent" className="btnVedi" onClick={() => navigate(-1)}>
                Annulla
              </Button>

              <Button className="btnVedi" variant="transparent" type="submit">
                Salva Modifiche
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPrenotazioneComp;