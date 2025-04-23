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

export const updatePrenotazione = createAsyncThunk(
  'prenotazioni/updatePrenotazione',
  async ({ id, formData, token }, { rejectWithValue }) => {
 
    if (!id) {
      return rejectWithValue('ID prenotazione mancante');
    }

    try {
      console.log('Invio aggiornamento a:', `https://localhost:7141/api/Prenotazioni/${id}`, 'con dati:', formData);
      
      const response = await fetch(`https://localhost:7141/api/Prenotazioni/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        let errorMessage = 'Errore durante l\'aggiornamento della prenotazione';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          console.error('Errore nel parsing della risposta JSON:', e);
        }
        throw new Error(errorMessage);
      }
      
      let responseData = {};
      try {
        responseData = await response.json();
      } catch (e) {
        console.log('Nessun dato JSON nella risposta, assumo successo', e);
      }
    
      return { 
        id: parseInt(id), 
        ...formData,
        ...(typeof responseData === 'object' ? responseData : {})
      };
    } catch (error) {
      console.error('Errore completo:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Elimina Prenotazione 
export const deletePrenotazione = createAsyncThunk(
  'prenotazioni/deletePrenotazione',
  async ({ id, token }) => {
    const response = await fetch(`https://localhost:7141/api/Prenotazioni/${id}`, {
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
      })
      .addCase(updatePrenotazione.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrenotazione.fulfilled, (state, action) => {
        state.loading = false;
        const { id, ...updatedData } = action.payload;
        const numericId = parseInt(id);
        const index = state.lista.findIndex((p) => p.id === numericId);
        
        console.log('Update completato. ID:', numericId, 'Indice trovato:', index);
        
        if (index !== -1) {
          state.lista[index] = {
            ...state.lista[index],
            ...updatedData
          };
          console.log('Elemento aggiornato:', state.lista[index]);
        } else {
          console.error('Elemento non trovato con ID:', numericId);
        }
      })
      .addCase(updatePrenotazione.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default prenotazioniSlice.reducer;