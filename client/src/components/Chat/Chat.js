import React from 'react';
import FileUpload from './FileUpload';
import QuestionForm from './QuestionForm';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import NavBar from '../UI/Navbar';

function Chat() {
    return (
        <Box>
          <NavBar/>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                  <Typography variant="h4" component="h1" gutterBottom sx={{
                        color: '#FFF0F5',
                        textAlign: 'center',
                        fontFamily: "'Exo 2', 'Reem Kufi', sans-serif",
                        m: '3rem',
                        fontSize: '3rem'
                    }}>
                    Chat with PDF
                  </Typography>
                  <FileUpload />
                  <QuestionForm />
            </Box>
        </Box>
        

    );
}

export default Chat;
