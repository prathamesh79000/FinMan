import React from 'react';
import { Box, styled, Typography } from '@mui/material';

// Styled components using MUI's styled API
const Card = styled(Box)(({ theme }) => ({
    width: 'auto',  
    maxWidth: '100%', 
    margin:'.5rem',
    padding:'10px',
    backgroundColor: '#282828',
    borderRadius: 8,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',  

}));

const Tools = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: 9,
});

const Circle = styled(Box)({
  padding: '0 4px',
});

const BoxCircle = styled(Box)({
  display: 'inline-block',
  alignItems: 'center',
  width: 10,
  height: 10,
  padding: 1,
  borderRadius: '50%',
});

const RedCircle = styled(BoxCircle)({
  backgroundColor: '#ff605c',
});

const YellowCircle = styled(BoxCircle)({
  backgroundColor: '#ffbd44',
});

const GreenCircle = styled(BoxCircle)({
  backgroundColor: '#00ca4e',
});

const CardContent = styled(Box)({
  flex: 1, // Allow content to fill available space
  padding: '8px',
});

// Card component definition
function CustomCard ({ title, children, ...props }) {
  return (
    <Card {...props}>
      {title && (
        <Typography variant="h6" sx={{ padding: '8px', textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      <Tools>
        <Circle><RedCircle /></Circle>
        <Circle><YellowCircle /></Circle>
        <Circle><GreenCircle /></Circle>
      </Tools>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default CustomCard;
