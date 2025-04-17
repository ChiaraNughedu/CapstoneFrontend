import React from 'react';

const AboutUsComp = () => {
  return (
    <div className="container my-5">

      <div className="text-center mb-5">
        <h1 className="mb-3">Chi Siamo</h1>
        <p className="lead">
          Siamo specializzati nel proporre esperienze uniche in ville di lusso selezionate con cura.
          La nostra missione è offrire soggiorni esclusivi, comfort impareggiabile e un servizio su misura
          per rendere ogni vacanza indimenticabile.
          Il nostro obiettivo principale è raccogliere in un unico servizio le migliori ville di lusso della Costa Smeralda, da sempre meta esclusiva per il jet-set internazionale.
          Le nostre ville sono selezionate con cura per garantire il massimo del comfort e della privacy, grazie a un servizio di concierge dedicato e altamente professionale.
          Ogni villa è selezionata con cura dal nostro eccellente Team locale, attraverso un accurato processo di selezione; soggiornare nelle nostre proprietà garantisce a ciascun ospite uno standard di altissima qualità con un team dedicato, assisenza costante ed efficace per ogni esigenza.

          Da anni ci occupiamo di affitti di lusso e abbiamo una profonda conoscenza del mercato immobiliare della Costa Smeralda, uno dei luoghi più spettacolari di tutta la Sardegna.
          Conosciamo il nostro territorio e le sue bellezze, e per questo siamo in grado di offrire il meglio per le vostre esperienze.

          Da sempre scegliamo la Costa Smeralda come cuore pulsante della nostra attività, per le innumerevoli bellezze naturali, le spiagge incantevoli e il mare cristallino, ma anche per l'esclusività della sua vita notturna e dei suoi eventi mondani.

        </p>
      </div>

      <div>
        <h2 className="text-center mb-4">Le Nostre Sedi</h2>
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mb-4">
            <h5>Porto Cervo</h5>
            <p>Via dei Pescatori, 12</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <h5>Porto Rafael</h5>
            <p>Via delle Conghiglie, 46</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <h5>Olbia</h5>
            <p>Via del Mare, 89</p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default AboutUsComp;
