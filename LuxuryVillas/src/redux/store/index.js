import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import prenotazioniReducer from '../reducers/prenotazioniSlice';  
import blogReducer from '../reducers/blogSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    prenotazioni: prenotazioniReducer,
    blog: blogReducer, 
  },
});

export default store;
