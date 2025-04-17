import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import prenotazioniReducer from '../reducers/prenotazioniSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    prenotazioni: prenotazioniReducer,
  },
});

export default store;
