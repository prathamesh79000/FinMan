import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomFileUploadComponent from '../UI/CustomFile';

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(true); // Initially assuming upload is successful

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append('pdf_docs', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbarOpen(true);
      setUploadSuccess(true); // Set upload status to successful
    } catch (error) {
      console.error('Error uploading files:', error);
      setSnackbarOpen(true);
      setUploadSuccess(false); // Set upload status to unsuccessful
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <CustomFileUploadComponent onChange={handleFileChange} />
      
      <Button
        sx={{
          backgroundColor: '#ff9966',
          mt: '1rem',
          color: "white",
          paddingX: '.5rem',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#FECDA6',
            transition: 'background-color 0.6s ease'
          },
        }}
        onClick={uploadFiles}
        startIcon={<CloudUploadIcon />}
        disabled={selectedFiles.length === 0} // Disable button when no files are selected
      >
        Upload
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={uploadSuccess ? "success" : "error"} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {uploadSuccess ? "Files uploaded successfully!" : "Error uploading files"}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FileUpload;
