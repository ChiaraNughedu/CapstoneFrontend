import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import PrenotazioniComp from './PrenotazioniComp'; // Importa il componente PrenotazioniComp

const AddPrenotazioneComp = () => {
  const { idVilla } = useParams(); // /prenota/:idVilla
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [dataInizio, setDataInizio] = useState('');
  const [dataFine, setDataFine] = useState('');
  const [villaNome, setVillaNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch nome della villa al caricamento
  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const res = await fetch(`https://localhost:7141/api/Ville/${idVilla}`);
        const contentType = res.headers.get('content-type');
        
        if (!res.ok) {
          const errorText = contentType?.includes('application/json')
            ? (await res.json()).message
            : 'Errore nel recupero della villa';
          throw new Error(errorText);
        }
        
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('La risposta non è in formato JSON');
        }
        
        const data = await res.json();
        console.log("Villa data:", data);
        setVillaNome(data.nomeVilla); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [idVilla]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataInizio || !dataFine) {
      setError('Inserisci entrambe le date');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7141/api/Prenotazioni`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          villaId: idVilla,
          dataInizio,
          dataFine,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Errore nella prenotazione');
      }

      setSuccess('Prenotazione effettuata con successo!');
      setTimeout(() => navigate('/prenotazioni'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4 px-0 pt-3 pb-4 ">
      <Row className="justify-content-between">
        <Col md={5} className=" px-0">
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <h2 className="loginTitle text-center py-3 mb-4">Prenota {villaNome}</h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formDataInizio">
                  <Form.Label><strong>Check-in</strong></Form.Label>
                  <Form.Control
                    type="date"
                    value={dataInizio}
                    onChange={(e) => setDataInizio(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-5" controlId="formDataFine">
                  <Form.Label><strong>Check-out</strong></Form.Label>
                  <Form.Control
                    type="date"
                    value={dataFine}
                    onChange={(e) => setDataFine(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <Button variant="transparent" className="btnVedi" onClick={() => navigate(-1)}>
                     Annulla
                  </Button>

                  <Button variant="transparent" type="submit" className="btnVedi">
                     Conferma prenotazione
                 </Button>
                </div>

              </Form>
            </>
          )}
        </Col>
        
        <Col md={6} className="bordinoGoldLeft d-none d-md-block"> 
        <PrenotazioniComp/>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPrenotazioneComp;
