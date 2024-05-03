import React from 'react';
import { Box } from '@mui/material';
import NavBar from '../UI/Navbar';
import CompanySearch from './CompanySearch';

function Stock() {
    return (
        <Box>
            <NavBar />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{ width: '100%', maxWidth: '500px' }}> {/* Adjust width as needed */}
                    <CompanySearch />
                </Box>
            </Box>
        </Box>
    );
}

export default Stock;
