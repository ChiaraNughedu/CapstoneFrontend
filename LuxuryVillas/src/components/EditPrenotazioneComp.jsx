import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    // Logica per aggiornare la prenotazione
    dispatch(updatePrenotazione({ id, formData, token }));
    navigate('/prenotazioni');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Modifica Prenotazione</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dataInizio" className="block text-lg font-medium">
            Data di inizio
          </label>
          <input
            type="date"
            id="dataInizio"
            value={formData.dataInizio}
            onChange={(e) => setFormData({ ...formData, dataInizio: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataFine" className="block text-lg font-medium">
            Data di fine
          </label>
          <input
            type="date"
            id="dataFine"
            value={formData.dataFine}
            onChange={(e) => setFormData({ ...formData, dataFine: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Salva Modifiche
        </button>
      </form>
    </div>
  );
};

export default EditPrenotazioneComp;
