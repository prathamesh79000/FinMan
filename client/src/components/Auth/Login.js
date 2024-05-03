import { Alert, Button, Card, CircularProgress, Grid, TextField, Typography, Box } from "@mui/material";
import signInImage from '../../assets/signin.jpg';
import useLogin from "./useLogin";
import { Link} from "react-router-dom";


const Login = () => {
  const { error, loading, loginUser } = useLogin();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    await loginUser(formData);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '50%',
        maxWidth: '50%',
        margin: '0 auto',
      }}
    >
      <Card className="form-container" sx={{ 
        display: 'flex', flexDirection: 'column', width: '100%', padding: '2rem'                                    // boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)"
        ,
        boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)"
      }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ bgcolor: '#003366', borderRadius: '18px' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${signInImage})`,
              }}
            ></div>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Sign In
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Join to account
            </Typography>
            <form
              onSubmit={handleLogin}
              autoComplete='off'
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                variant="outlined"
                size="large"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                variant="outlined"
                size="large"
              />
              {error && (
                <Alert
                  severity="error"
                  onClose={() => {}}
                >
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ mt: 2, py: 1.5, px: 4, borderRadius: '12px', fontSize: '1rem' }} // Custom styles
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              <Button
                component={Link}
                to="/auth/register"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '12px',
                  borderColor: '#003366',
                  color: '#003366',
                  fontSize: '1rem',
                  bgcolor: '#FF9966',
                  '&:hover': {
                    opacity: 0.8,
                    bgcolor: '#FF9966',
                  },
                  mt: 2,
                  py: 1.5,
                  px: 4,
                }}
              >
                Create Account
              </Button>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Login;
