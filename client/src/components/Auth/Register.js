// src/Auth/Register.js
import { Alert, Button, Card, Typography, TextField, CircularProgress,Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import signUpImage from "../../assets/signup.jpg";
import useSignUp from './useSignUp';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const { loading, error, registerUser } = useSignUp();
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      passwordConfirm: event.target.passwordConfirm.value
    };
    await registerUser(formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', width: '100%', maxWidth: '1000px' 
      ,                                    boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)"

    }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome to Finman
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Create an account
            </Typography>
            <form onSubmit={handleRegister} autoComplete="off" method="POST">
              <TextField
                label="Full name"
                name="name"
                type="text"
                required
                variant="outlined"
                size="large"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                variant="outlined"
                size="large"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                variant="outlined"
                size="large"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
                required
                variant="outlined"
                size="large"
                fullWidth
                sx={{ mb: 2 }}
              />
              {error && (
                <Alert severity="error" onClose={() => {}} sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                fullWidth
                sx={{ mb: 2, borderRadius: '12px', fontSize: '1rem' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Account'}
              </Button>
              <Button
                component={Link}
                to="/auth/login"
                variant="outlined"
                size="large"
                fullWidth
                sx={{ borderRadius: '12px', borderColor: '#003366', color: '#003366', fontSize: '1rem',bgcolor:'#FF9966','&:hover': {
                  opacity: 0.8,
                  bgcolor:'#FF9966',
                } }}
              >
                Sign In
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                bgcolor: '#003366',
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <img src={signUpImage} alt="Sign Up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Grid>
        </Grid>
        
      </Card>
    </Box>
  );
}

export default Register;
