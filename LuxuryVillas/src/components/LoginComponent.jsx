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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, username } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const endpoint = isLogin ? "/api/Auth/login" : "/api/Auth/register";
    
    
    if (!isLogin) {
      if (!formData.nome || !formData.cognome || !formData.email || !formData.username || !formData.password) {
        setError("Tutti i campi sono obbligatori");
        setLoading(false);
        return;
      }
    }
    
    
    const payload = isLogin
      ? {
          username: formData.username,
          password: formData.password,
        }
      : {
          nome: formData.nome,
          cognome: formData.cognome,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        };
    
    console.log("Sending payload:", payload);
    console.log("To endpoint:", endpoint);
  
    try {
      const res = await fetch(`https://localhost:7141${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const contentType = res.headers.get("content-type");
      console.log("Response status:", res.status);
      console.log("Content type:", contentType);
  
      if (!res.ok) {
    
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          console.error("Error data:", errorData);
          throw new Error(errorData.message || errorData.error || "Errore nella richiesta.");
        } else {
          const errorText = await res.text();
          console.error("Error text:", errorText);
          throw new Error(errorText || "Errore generico.");
        }
      }

      if (!isLogin) {
       
        setError("");
        alert("Registrazione completata con successo! Ora puoi effettuare il login.");
        setIsLogin(true);
     
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          username: "",
          password: "",
        });
      } else {
        
        const data = await res.json();
        console.log("Login success:", data);
    
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
      }
    } catch (err) {
      console.error("Error caught:", err);
      setError(err.message || "Si è verificato un errore. Riprova.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    alert("Logout effettuato con successo!");
    navigate("/login");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); 
  
    if (!isLogin) {
      setFormData({
        ...formData,
        nome: "",
        cognome: "",
        email: "",
      });
    }
  };

  return (
    <Container fluid className="loginContainer py-5">
      <Row className="justify-content-center">
        <Col md={6} className="loginBox text-center mb-4 pb-4">
          <h2 className="loginTitle text-center mb-4">
            {isLogin ? "Login" : "Registrazione"}
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {token ? (
            <div className="text-center">
              <Alert className="loginAlert py-3 my-4 mx-auto w-75 border-0">
                Login effettuato come: <strong>{username}</strong>
              </Alert>
              <Button variant="transparent" className="btnVedi mt-2" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
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

                <Button 
                  variant="transparent" 
                  type="submit" 
                  className="w-75 btnVedi"
                  disabled={loading}
                >
                  {loading ? "Caricamento..." : (isLogin ? "Accedi" : "Registrati")}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Button
                  className="loginLink"
                  variant="link"
                  onClick={toggleForm}
                  disabled={loading}
                >
                  {isLogin
                    ? "Non hai un account? Registrati"
                    : "Hai già un account? Accedi"}
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;