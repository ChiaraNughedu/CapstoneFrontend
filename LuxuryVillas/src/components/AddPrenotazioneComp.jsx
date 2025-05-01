import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import PrenotazioniComp from './PrenotazioniComp';

const AddPrenotazioneComp = () => {
  const { idVilla } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [dataInizio, setDataInizio] = useState('');
  const [dataFine, setDataFine] = useState('');
  const [villaNome, setVillaNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setTimeout(() => {
        navigate('/prenotazioni');
        setTimeout(() => window.scrollTo(0, 0), 100);
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4 pt-3 pb-4 px-3 px-md-5">
     <Row className="flex-column flex-md-row align-items-start justify-content-md-between">

        <Col xs={12} sm={10} md={6} lg={5} className="mb-5 mb-md-0">
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

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 gap-3">
                  <Button
                    variant="transparent"
                    className="btnVedi w-100 w-sm-auto"
                    onClick={() => {
                      navigate(-1);
                      setTimeout(() => window.scrollTo(0, 0), 100);
                    }}
                  >
                    Torna indietro
                  </Button>

                  <Button
                    variant="transparent"
                    type="submit"
                    className="btnVedi w-100 w-sm-auto"
                  >
                    Conferma prenotazione
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Col>

        <Col xs={12} sm={10} md={6} className="bordinoGoldLeft">
          <PrenotazioniComp />
        </Col>
      </Row>
    </Container>
  );
};

export default AddPrenotazioneComp;
