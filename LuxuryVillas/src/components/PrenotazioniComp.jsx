import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPrenotazioni,
  deletePrenotazione,
} from '../redux/reducers/prenotazioniSlice';
import { useNavigate } from 'react-router-dom';

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
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Accesso richiesto</h2>
        <p>Non hai effettuato il login.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Le tue prenotazioni</h2>

      {loading && <p>Caricamento...</p>}
      {error && <p className="text-red-500">Errore: {error}</p>}

      {lista.length === 0 && !loading && <p>Nessuna prenotazione trovata.</p>}

      {isDeleted && (
        <p className="text-green-600 font-semibold mb-4">
          Prenotazione eliminata con successo!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lista.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow p-4 bg-white flex flex-col gap-2"
          >
            <h3 className="text-xl font-semibold">{p.nomeVilla}</h3>
            <p>
              <strong>Dal:</strong>{' '}
              {new Date(p.dataInizio).toLocaleDateString()} <strong>al:</strong>{' '}
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

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(p.id)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Modifica
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrenotazioniComp;
