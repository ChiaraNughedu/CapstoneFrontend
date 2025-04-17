import React from "react";
import VilleComponent from "../components/VilleComponent";
import PrenotazioniComp from "./PrenotazioniComp";

const AdminDashboard = () => {
  return (
    <div className="py-5">
      <h1 className="text-center mb-4">Dashboard Amministratore</h1>
      <VilleComponent />
      <PrenotazioniComp />  
    </div>
  );
};

export default AdminDashboard;
