import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPrenotazioni,
  deletePrenotazione,
} from '../redux/reducers/prenotazioniSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
const PrenotazioniComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, ruolo } = useSelector((state) => state.auth);
  const { lista, loading, error } = useSelector((state) => state.prenotazioni);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchPrenotazioni({ token, ruolo }));
    }
  }, [dispatch, token, ruolo]);

  const handleEdit = (id) => {
    navigate(`/modifica-prenotazione/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler cancellare questa prenotazione?')) {
      dispatch(deletePrenotazione({ id, token })).then(() => {
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      });
    }
  };

  if (!token) {
    return (
      <Container className="effettuaContainer py-5">
        <h2>Accesso richiesto</h2>
        <p>Non hai effettuato il login.</p>
      </Container>
    );
  }

  return (
    <Container className="prenotazioniContainer px-0 py-3">
      <h2 className="text-center loginTitle pb-3">
        {ruolo === 'Admin' ? 'Tutte le prenotazioni' : 'Le tue prenotazioni'}
      </h2>


      {loading && <p>Caricamento...</p>}
      {error && <Alert variant="danger">Errore: {error}</Alert>}
      {lista.length === 0 && !loading && <p>Nessuna prenotazione trovata.</p>}

      {isDeleted && (
        <Alert variant="success">
          Prenotazione eliminata con successo!
        </Alert>
      )}

      <Row className="g-4">
        {lista.map((p) => (
          <Col key={p.id} xs={12} md={6}>
            <div className="border rounded p-3 bg-transparent h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="villaCardName mb-2">{p.nomeVilla}</h4>
                <p>
                  <strong>Dal:</strong>{' '}
                  {new Date(p.dataInizio).toLocaleDateString()} <br /> <strong>al:</strong>{' '}
                  {new Date(p.dataFine).toLocaleDateString()}
                </p>
                <p>
                  <strong>Prezzo:</strong> € {p.prezzoTotale.toLocaleString()}
                </p>

                {ruolo === 'Admin' && (
                  <p>
                    <strong>Utente:</strong> {p.nome} {p.cognome} ({p.userEmail})
                  </p>
                )}
              </div>

              <div className="d-flex justify-content-between gap-2 mt-3">
                <Button
                  variant="transparent"
                  className="btnVedi"
                  onClick={() => handleEdit(p.id)}
                >
                  Modifica
                </Button>
                <Button
                  variant="transparent"
                  className="btnVedi"
                  onClick={() => handleDelete(p.id)}
                >
                  Elimina
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PrenotazioniComp;
