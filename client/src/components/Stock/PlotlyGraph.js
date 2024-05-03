import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Box } from '@mui/material';

const PlotlyGraph = ({ symbol }) => {
  const [graphData, setGraphData] = useState(null);
  const [layout, setLayout] = useState({
    title: 'Default Title',
    xaxis: { title: 'Default X-Axis Title' },
    yaxis: { title: 'Default Y-Axis Title' },
    template: 'plotly_dark',
    font: { color: 'white' },
  });

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const flaskServerURL = 'http://localhost:5000';
        const response = await axios.get(`${flaskServerURL}/stock/${symbol}`);
        const rawData = response.data.graphData;
        const parsedData = JSON.parse(rawData);

        // Update both graph data and layout
        setGraphData(parsedData.data);
        setLayout(parsedData.layout || layout);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchGraphData();
  }, [symbol]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '2rem'
        }}
      >
        {graphData && (
          <Plot
            data={graphData}
            layout={layout}
          />
        )}
      </Box>
    </Box>
  );
};

export default PlotlyGraph;
