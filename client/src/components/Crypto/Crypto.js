import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Avatar, Button, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import NavBar from './UI/Navbar';

const Crypto = () => {
  const [latestTradingCoins, setLatestTradingCoins] = useState([]);
  const [biggestCoins, setBiggestCoins] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLatestTradingCoins();
    fetchBiggestCoins();
    fetchData();
  }, [page]);

  const fetchLatestTradingCoins = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=5&page=1&sparkline=false');
      const data = await response.json();
      setLatestTradingCoins(data);
    } catch (error) {
      console.error("Error fetching latest trading coins data: ", error);
    }
  };

  const fetchBiggestCoins = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
      const data = await response.json();
      setBiggestCoins(data);
    } catch (error) {
      console.error("Error fetching biggest coins data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`);
      const data = await response.json();
      setCryptos(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Box sx={{ mt: 3, mx: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '48%', padding: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.5)' }}>
          <Typography variant="h5" gutterBottom>
            Latest Tranding Coins
          </Typography>
          <List>
            {latestTradingCoins.map((coin) => (
              <ListItem key={coin.id}>
                <ListItemIcon>
                  <Avatar src={coin.image} />
                </ListItemIcon>
                <ListItemText primary={coin.name} secondary={coin.symbol.toUpperCase()} />
                <ListItemText primary={`$${coin.current_price}`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ width: '48%', padding: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.5)' }}>
          <Typography variant="h5" gutterBottom>
            Biggest Coins
          </Typography>
          <List>
            {biggestCoins.map((coin) => (
              <ListItem key={coin.id}>
                <ListItemIcon>
                  <Avatar src={coin.image} />
                </ListItemIcon>
                <ListItemText primary={coin.name} secondary={coin.symbol.toUpperCase()} />
                <ListItemText primary={`$${coin.current_price}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box sx={{ mt: 3, mx: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.5)' }}>
        <TableContainer component={Paper} style={{ backdropFilter: 'blur(10px)' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Button variant="outlined" onClick={handlePrevPage} disabled={page === 1}>Previous Page</Button>
          <Button variant="outlined" onClick={handleNextPage} sx={{ ml: 2 }}>Next Page</Button>
        </Box>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            Loading...
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Crypto;
