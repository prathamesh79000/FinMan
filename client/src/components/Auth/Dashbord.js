// not important
// src/pages/Dashboard.js

import { Avatar, Button, Card, Typography, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', p: '2rem' }}>
        <Avatar sx={{ width: 150, height: 150 }} alt={userData.name} src={<PersonOutlineIcon />} className="avatar" />
        <Typography variant="h4" fontWeight="bold" className="username">{userData.name}</Typography>
        <Typography variant="body1" color="textSecondary">Email: {userData.email}</Typography>
        <Typography variant="body1" color="textSecondary">Role: {userData.role}</Typography>
        <Button onClick={handleLogout} variant="contained">Log out</Button>
      </Box>
    </Card>
  );
}

export default Dashboard;
