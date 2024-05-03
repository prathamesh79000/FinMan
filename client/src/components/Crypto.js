import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Avatar } from '@mui/material';
import NavBar from './UI/Navbar';

const Crypto = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Box sx={{ mt: 3, mx: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.7)' }}>
        <TableContainer component={Paper} style={{ maxHeight: 440, overflowY: 'auto', backdropFilter: 'blur(10px)' }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="cryptocurrency table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Symbol</TableCell>
                <TableCell align="right">Current Price</TableCell>
                <TableCell align="right">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptos.map((crypto) => (
                <TableRow
                  key={crypto.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={crypto.image} sx={{ mr: 1 }} />
                      {crypto.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{crypto.symbol.toUpperCase()}</TableCell>
                  <TableCell align="right">${crypto.current_price.toLocaleString()}</TableCell>
                  <TableCell align="right">${crypto.market_cap.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Crypto;
