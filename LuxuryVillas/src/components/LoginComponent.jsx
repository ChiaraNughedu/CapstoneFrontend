import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/reducers/authReducer";

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, username } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin ? "/api/Auth/login" : "/api/Auth/register";
    const payload = isLogin
      ? {
          username: formData.username,
          password: formData.password,
        }
      : formData;

    try {
      const res = await fetch(`https://localhost:7141${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Errore nel login o nella registrazione");

      const data = await res.json();

      dispatch(
        setUser({
          token: data.token,
          ruolo: data.ruolo,
          username: data.username,
          email: data.email,
        })
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("ruolo", data.ruolo);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);

      if (data.ruolo === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    alert("Logout effettuato con successo!");
    navigate("/login");
  };

  return (
    <Container className="loginContainer py-5">
      <Row className="justify-content-center">
        <Col md={6} className="loginBox text-center pb-4">
          <h2 className="loginTitle text-center mb-4">
            {isLogin ? "Login" : "Registrazione"}
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <Form.Group className="mb-3 mx-auto w-75">
                  <Form.Label className="formLabel">Nome</Form.Label>
                  <Form.Control
                  className="formLogin"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 mx-auto w-75">
                  <Form.Label className="formLabel">Cognome</Form.Label>
                  <Form.Control
                   className="formLogin"
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 mx-auto w-75">
                  <Form.Label className="formLabel">Email</Form.Label>
                  <Form.Control
                   className="formLogin"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3 mx-auto w-75">
              <Form.Label className="formLabel">Username</Form.Label>
              <Form.Control
               className="formLogin"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 mx-auto w-75">
              <Form.Label className="formLabel">Password</Form.Label>
              <Form.Control
               className="formLogin"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="transparent" type="submit" className="w-75 btnVedi">
              {isLogin ? "Accedi" : "Registrati"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button className="loginLink" variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Non hai un account? Registrati"
                : "Hai già un account? Accedi"}
            </Button>
          </div>

          {token && (
            <div className="text-center">
              <Alert className="loginAlert py-3 mx-auto w-75 border-0">
                Login effettuato come: <strong>{username}</strong>
              </Alert>
              <Button variant="transparent" className="btnVedi" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
