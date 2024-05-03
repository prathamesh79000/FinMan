// src/hooks/useSignin.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import Snackbar from "@mui/material/Snackbar";
import { setUser } from '../../redux/slice/userSlice';

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const dispatch = useDispatch();
const navigate = useNavigate()

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {

                setOpenSnackbar(true);
                setSnackbarMessage("Login Successful");
                dispatch(setUser(data.user));
                login(data.token, data.user);
                navigate('/stock')
            } else if (res.status === 404) {
                setError(data.message);
            } else {
                setError('Login Failed');
            }
        } catch (error) {
            setError('Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser, handleCloseSnackbar, openSnackbar, snackbarMessage };
};

export default useLogin;