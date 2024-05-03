import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { Box } from "@mui/material";
import CustomCard from '../UI/Card';


function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);


  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const askQuestion = async () => {
    setLoading(true); // Set loading to true while fetching the answer
    try {
      const response = await axios.post('http://localhost:5000/ask', { question });
      setAnswer(response.data.reply);
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Error asking question');
    } finally {
      setLoading(false); // Set loading to false after fetching the answer
    }
  };

  return (
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',m:'2rem'}}>
      <TextField
        label="Ask a question"
        variant="filled"
        sx={{
          width:'500px'
          
        }}
    
        value={question}
        onChange={handleQuestionChange}
        margin="normal"
      />
      <Button sx={{
                            backgroundColor: '#ff9966',
                            mt: '1rem',
                            color: "white",
                            paddingX:'.5rem',
                            fontSize: '1rem',
                            

                            '&:hover': {
                                backgroundColor: '#FECDA6',
                                transition: 'background-color 0.6s ease'
                            },
                            
                        }} onClick={askQuestion}>
        Ask
      </Button>
      {loading ? (
        <CircularProgress sx={{ mt: '1rem' }} />
      ) : (
        <CustomCard>
        <Typography variant="body1" sx={{textAlign: 'left', fontSize:'1rem',lineHeight:'2',fontWeight:'bold'}}>
          Answer: {answer}
        </Typography>
        </CustomCard>
      )}
    </Box>
  );
}

export default QuestionForm;
