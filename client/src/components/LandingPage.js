import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import VideoPlayer from './VideoPlayer'
import logo from '../png/logo-no-background.png'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.js'


const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            textAlign: 'center',
            background: "linear-gradient(180deg,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))"
        }}>

            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: '0.1rem'
            }}>
                <Typography variant="h6" component="div" sx={{}}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            marginTop: '10px',
                            marginLeft: '50px',
                            height: '50px',
                        }}
                    />
                </Typography>
                
                <Button
                    variant="contained"
                    size="small"
                    color='secondary'
                    onClick={() => navigate('/auth/login')}
                    sx={{
                        padding: '12px',
                        marginRight: '50px',
                        backgroundColor: '#ff9966',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#FECDA6',
                            transition: 'background-color 0.6s ease'
                        },

                    }}
                >
                    Login/Register
                </Button>

            </Toolbar>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h1" component="div" sx={{
                        color: '#FFF0F5',
                        textAlign: 'center',
                        fontFamily: "'Exo 2', 'Reem Kufi', sans-serif",
                        mt: '5rem',
                        fontSize: '5rem'
                    }}>
                        All things Finance,<br />right here.
                    </Typography>
                    <Button variant='outlined'
                        onClick={() => navigate('/auth/login')}
                        sx={{
                            backgroundColor: '#ff9966',
                            mt: '1rem',
                            color: 'primary',
                            fontFamily: "'Exo 2', 'Reem Kufi', sans-serif",
                            fontSize: '1rem',
                            fontWeight: 600,

                            '&:hover': {
                                backgroundColor: '#FECDA6',
                                transition: 'background-color 0.6s ease'
                            },
                        }}
                    >Get started</Button>
                </Box>
                <VideoPlayer />
            </Box>
            <Footer />
        </Box>
    );
};

export default LandingPage;
