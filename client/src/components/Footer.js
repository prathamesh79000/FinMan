import * as React from "react";
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import logo from '../png/logo-white.png'


export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>

                            About Us
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '116px',
                                    height: '50px',
                                }}
                            />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            We are FinMan, dedicated to providing the best service to our
                            customers.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            123 Main Street, Anytown, USA
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: info@example.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +1 234 567 8901
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Services
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'underline' }}>
                            Home
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'underline' }}>
                            News
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'underline' }}>
                            Stock
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'underline' }}>
                            Crypto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://your-website.com/">
                            Your Website
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}