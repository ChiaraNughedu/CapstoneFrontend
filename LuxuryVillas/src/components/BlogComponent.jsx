import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticoli } from "../redux/reducers/blogSlice";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";

const BlogComponent = () => {
  const dispatch = useDispatch();
  const { articoli, loading, error } = useSelector((state) => state.blog);
  const { ruolo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate(-1); 
  } 


  return (
    <Container className="mt-5 pb-5">
      <h1 className="text-center mb-4 villeTitle">Scopri la Costa Smeralda</h1>
      <hr className="separateHr mt-4" />
      <Row>
        {articoli.map((articolo) => (
          <Col xs={12} key={articolo.id} className="mb-2">
            <Card className="blogCard p-3 ">
              <Card.Title className="blogCardName mb-3 text-center text-md-start">
                {articolo.luogo}
              </Card.Title>

           <Row className="g-3 d-block d-md-flex align-items-start">
              <Col xs={12} md={4}>
               <Card.Img
                src={articolo.imageUrl}
                 alt={articolo.luogo}
                   className="blogImg img-fluid rounded mb-3 mb-md-0"
                />
              </Col>
              <Col xs={12} md={8}>
                <Card.Body className="p-0">
                 <Card.Text className="blogDescrizione">
                   {articolo.descrizione1}
                 </Card.Text>
                </Card.Body>
               </Col>
           </Row>

              <Row className="justify-content-end mt-4">
                <Col xs="auto">
                  <Link to={`/blog/${articolo.id}`}>
                    <Button variant="transparent" className="btnVedi">
                      Leggi di più
                    </Button>
                  </Link>

                  {ruolo === "Admin" && (
                    <>
                      <Link to={`/blog/modifica/${articolo.id}`} className="ms-2">
                        <Button variant="transparent" className="btnVedi">
                          Modifica
                        </Button>
                      </Link>
                      <Button
                        variant="transparent"
                        className="ms-2 btnVedi"
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
       <Row>
        <Col>
         <Button  variant="transparent" className="btnVedi" onClick={handleGoBack}>
            Torna Indietro
         </Button>
        </Col>
       
        </Row> 
    </Container>
  );
};

export default BlogComponent;
