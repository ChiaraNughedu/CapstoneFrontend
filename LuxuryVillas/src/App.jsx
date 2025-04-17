import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import LogoutComp from './components/LogoutComp';
import VilleComponent from './components/VilleComponent';
import DetailsComponent from './components/DetailsComponent';
import UserDashboard from './components/UserDashboard'; 
import AdminDashboard from './components/AdminDashboard';
import EditVillaComp from './components/EditVillaComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import FooterComponent from './components/FooterComponent';
import AboutUsComp from './components/AboutUsComponent';
import PrenotazioniComp from './components/PrenotazioniComp';
import AddPrenotazioneComp from './components/AddPrenotazioneComp';


function App() {

  return (

  <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/logout" element={<LogoutComp />} />
        <Route path="/ville" element={<VilleComponent />} />
        <Route path="/Ville/:id" element={<DetailsComponent />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/modifica-villa/:id" element={<EditVillaComp />} />
        <Route path="/chi-siamo" element={<AboutUsComp />} />
        <Route path="/prenotazioni" element={<PrenotazioniComp />} />
        <Route path="/prenota/:idVilla" element={<AddPrenotazioneComp />} />

      </Routes>
      <FooterComponent /> 
    </BrowserRouter>
    
  )
}

export default App
