
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddPrenotazioneComp = () => {
  const { idVilla } = useParams(); // deve essere passato come /prenota/:idVilla
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [dataInizio, setDataInizio] = useState('');
  const [dataFine, setDataFine] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataInizio || !dataFine) {
      setError('Inserisci entrambe le date');
      return;
    }

    try {
      const response = await fetch(`/api/Prenotazioni`, {
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
      setTimeout(() => navigate('/prenotazioni'), 1500); // Redirect dopo 1.5s
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Prenota la villa</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Check-in:
          <input
            type="date"
            value={dataInizio}
            onChange={(e) => setDataInizio(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </label>

        <label>
          Check-out:
          <input
            type="date"
            value={dataFine}
            onChange={(e) => setDataFine(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Conferma prenotazione
        </button>
      </form>
    </div>
  );
};

export default AddPrenotazioneComp;
