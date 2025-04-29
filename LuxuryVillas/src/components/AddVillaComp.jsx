import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddVillaComp = () => {
  const [nomeVilla, setNomeVilla] = useState("");
  const [imgCopertina, setImgCopertina] = useState("");
  const [immagini, setImmagini] = useState(["", "", "", "", "", ""]);
  const [prezzo, setPrezzo] = useState("");
  const [localita, setLocalita] = useState("");
  const [categoriaId, setCategoriaId] = useState(1); // Villa default
  const [descrizione, setDescrizione] = useState("");
  const navigate = useNavigate();

  const handleImmagineChange = (index, value) => {
    const nuoveImmagini = [...immagini];
    nuoveImmagini[index] = value;
    setImmagini(nuoveImmagini);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVilla = {
      nomeVilla,
      imgCopertina,
      immagine1: immagini[0],
      immagine2: immagini[1],
      immagine3: immagini[2],
      immagine4: immagini[3],
      immagine5: immagini[4],
      immagine6: immagini[5],
      prezzo: parseFloat(prezzo),
      localita,
      categoriaId,
      descrizione,
    };

    fetch("https://localhost:7141/api/Ville", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVilla),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Villa aggiunta con successo!");
        navigate("/admin/ville");
      })
      .catch((err) => {
        console.error("Errore nell'aggiunta della villa:", err);
        alert("Errore durante l'aggiunta della villa.");
      });
  };

  const handleBack = () => {
    navigate(-1);
    setTimeout(() => {  
        
        window.scrollTo(0, 0);
      }, 10); 
  };

  return (
    <Container className="mt-3 pb-5">
      <h2 className="homeH5 text-center py-4">Aggiungi Nuova Villa</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nomeVilla">
          <Form.Label className="pt-2"><strong>Nome Villa</strong></Form.Label>
          <Form.Control
            type="text"
            value={nomeVilla}
            onChange={(e) => setNomeVilla(e.target.value)}
            required
            maxLength={100}
          />
        </Form.Group>

        <Form.Group controlId="imgCopertina">
          <Form.Label className="pt-2"><strong>Immagine di Copertura</strong></Form.Label>
          <Form.Control
            type="url"
            value={imgCopertina}
            onChange={(e) => setImgCopertina(e.target.value)}
          />
        </Form.Group>

        {immagini.map((img, idx) => (
          <Form.Group key={idx} controlId={`immagine${idx + 1}`}>
            <Form.Label className="pt-2"><strong>{`Immagine ${idx + 1}`}</strong></Form.Label>
            <Form.Control
              type="url"
              value={img}
              onChange={(e) => handleImmagineChange(idx, e.target.value)}
            />
          </Form.Group>
        ))}

        <Form.Group controlId="prezzo">
          <Form.Label className="pt-2"><strong>Prezzo</strong></Form.Label>
          <Form.Control
            type="number"
            value={prezzo}
            onChange={(e) => setPrezzo(e.target.value)}
            required
            min={0}
            max={100000}
          />
        </Form.Group>

        <Form.Group controlId="localita">
          <Form.Label className="pt-2"><strong>Località</strong></Form.Label>
          <Form.Control
            type="text"
            value={localita}
            onChange={(e) => setLocalita(e.target.value)}
            required
            maxLength={100}
          />
        </Form.Group>

        <Form.Group controlId="categoriaId">
          <Form.Label className="pt-2"><strong>Categoria</strong></Form.Label>
          <Form.Control
            as="select"
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
          >
            <option value={1}>Villa</option>
            <option value={2}>Appartamento</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="descrizione">
          <Form.Label className="pt-2"><strong>Descrizione</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            required
            maxLength={8000}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-5">
          <Button variant="transparent" className="btnVedi" onClick={handleBack}>
            Torna Indietro
          </Button>
          <Button type="submit" variant="transparent" className="btnVedi">
            Aggiungi Villa
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddVillaComp;
