import React from "react";
import VilleComponent from "../components/VilleComponent";
import PrenotazioniComp from "./PrenotazioniComp";

const UserDashboard = () => {
  return (
    <div className="py-5">
      <h1 className="text-center mb-4">Benvenuto su Boutique Villas</h1>
      <VilleComponent isAdmin={false} />
      <PrenotazioniComp isAdmin={false}/>  
    </div>
  );
};

export default UserDashboard;
