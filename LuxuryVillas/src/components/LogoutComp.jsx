import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/reducers/authReducer"; // Cambiato logout con clearUser
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

const LogoutComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());

    localStorage.removeItem("token");
    localStorage.removeItem("ruolo");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    setShowAlert(true);

    setTimeout(() => {
      navigate("/"); 
    }, 3500);
  };

  return (
    <>
      <Button className="btnVedi" variant="transparent" onClick={handleLogout}>
        Logout
      </Button>

      {showAlert && (
        <Alert
          variant="success"
          className="mt-3 position-absolute end-0 top-0 m-4"
          dismissible
        >
          Logout effettuato con successo!
        </Alert>
      )}
    </>
  );
};

export default LogoutComp;
