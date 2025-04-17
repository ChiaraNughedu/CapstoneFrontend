import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk per fetch delle prenotazioni
export const fetchPrenotazioni = createAsyncThunk(
  'prenotazioni/fetchPrenotazioni',
  async ({ token, ruolo }) => {
    const endpoint = ruolo === 'Admin' ? 'https://localhost:7141/api/Prenotazioni/tutte' : 'https://localhost:7141/api/Prenotazioni/mie';

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero delle prenotazioni');
    }

    const data = await response.json();
    return data;
  }
);

// Aggiungi un thunk per l'update della prenotazione
export const updatePrenotazione = createAsyncThunk(
  'prenotazioni/updatePrenotazione',
  async ({ id, formData, token }) => {
    const response = await fetch(`/api/Prenotazioni/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  }
);


// Thunk per eliminare una prenotazione
export const deletePrenotazione = createAsyncThunk(
  'prenotazioni/deletePrenotazione',
  async ({ id, token }) => {
    const response = await fetch(`/api/Prenotazioni/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Errore durante l\'eliminazione della prenotazione');
    }

    return id;
  }
);

const prenotazioniSlice = createSlice({
  name: 'prenotazioni',
  initialState: {
    lista: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrenotazioni.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrenotazioni.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchPrenotazioni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePrenotazione.fulfilled, (state, action) => {
        state.lista = state.lista.filter(p => p.id !== action.payload);
      });
  },
});

export default prenotazioniSlice.reducer;

