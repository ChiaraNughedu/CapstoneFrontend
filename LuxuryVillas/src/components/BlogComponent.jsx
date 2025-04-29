import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticoli } from "../redux/reducers/blogSlice";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";

const BlogComponent = () => {
  const dispatch = useDispatch();
  const { articoli, loading, error } = useSelector((state) => state.blog);
  const { ruolo } = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch(fetchArticoli());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Errore: {error}</div>;
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm("Sei sicuro di voler eliminare questo articolo?");
    
    if (confirmed) {
      console.log("Articolo eliminato con ID:", id);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 villeTitle">Scopri la Costa Smeralda</h1>
      <hr className="separateHr mt-4" />
      <Row>
        {articoli.map((articolo) => (
          <Col md={12} key={articolo.id}>
            <Card className="blogCard">
              <Row>
                <Card.Title className="blogCardName mb-4">{articolo.luogo}</Card.Title>
              </Row>
              <Row className="justify-content-around">
                <Col md={4}>
                  <Card.Img className="blogImg" src={articolo.imageUrl} alt={articolo.luogo} />
                </Col>
                <Col md={8}>
                  <Card.Body className="mt-0 pt-0">
                    <Card.Text className="blogDescrizione">{articolo.descrizione1}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
              <Row className="justify-content-end">
                <Col md={4} className="text-end me-2">
                  <Link to={`/blog/${articolo.id}`}>
                    <Button variant="transparent" className="btnVedi">Leggi di più</Button>
                  </Link>
                
                  {ruolo === "Admin" && (
                    <>
                      <Link to={`/blog/modifica/${articolo.id}`} className="ms-2">
                        <Button variant="transparent" className="btnVedi">Modifica</Button>
                      </Link>
                      <Button
                        variant="transparent" className="ms-2 btnVedi"
                        onClick={() => handleDelete(articolo.id)}
                      >
                        Elimina
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Card>
            <hr className="separateHr mt-4" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogComponent;
