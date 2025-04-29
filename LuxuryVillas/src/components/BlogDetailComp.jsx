import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticoloById } from "../redux/reducers/blogSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";

const BlogDetailComp = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articoloSingolo, loading, error, articoli } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchArticoloById(id));
  }, [dispatch, id]);

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

  if (!articoloSingolo) {
    return null;
  }

  const currentIndex = articoli ? articoli.findIndex((a) => a.id === parseInt(id)) : -1;
  const nextArticle = articoli && currentIndex !== -1 && articoli[currentIndex + 1];

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleNextArticle = () => {
    if (nextArticle) {
      navigate(`/blog/${nextArticle.id}`);
    }
  };

  return (
    <Container className="mt-5 pb-5">
      <Card className="blogCard ">
        <Card.Title className="blogDetailCardName text-center my-3">{articoloSingolo.luogo}</Card.Title>
        <hr className="separateHr" />
        <Card.Img className="blogDetailImg" variant="top" src={articoloSingolo.imageUrl} />
        <Card.Body>
          <Card.Text className="blogDescrizioneDetail">{articoloSingolo.descrizione1}</Card.Text>
          <Card.Text className="blogDescrizioneDetail">{articoloSingolo.descrizione2}</Card.Text>
        </Card.Body>
      </Card>
      <hr className="separateHr" />

      <Row className="mt-5 mb-4">
        <Col md={6}>
          <Button  variant="transparent" className="btnVedi" onClick={handleGoBack}>
            Torna Indietro
          </Button>
        </Col>
        <Col md={6} className="text-end">
          {nextArticle && (
            <Button  variant="transparent" className="btnVedi" onClick={handleNextArticle}>
              Articolo Successivo
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetailComp;
