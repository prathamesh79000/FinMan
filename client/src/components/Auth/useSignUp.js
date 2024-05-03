// src/hooks/useSignUp.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate()
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 201) {
        navigate('/stock')
        setOpenSnackbar(true);
        setSnackbarMessage("Account Created Successfully");
        login(data.token, data.user);
      } else {
        setError(data.message || "Registration Failed");
      }
    } catch (error) {
      setError(error.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registerUser,
    handleCloseSnackbar,
    openSnackbar,
    snackbarMessage,
  };
};

export default useSignUp;
