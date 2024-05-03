import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material'
import DataTable from './DataTable';
import { useDispatch } from 'react-redux';
import { setForecastingData } from '../../redux/slice/forecastingSlice';

function Forcasting({ symbol,onDataUpdate }) {
    const [forecasting, setForecasting] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const flaskServerURL = 'http://localhost:5000';
                const response = await axios.get(`${flaskServerURL}/forecast/${symbol}`);
                const data = response.data.forecast
                
                setForecasting(data);
                dispatch(setForecastingData(data)); 
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchGraphData();
    }, [symbol,dispatch]);



    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <>
                    Predicated Next Price
                </>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>

                    <Box>
                        <DataTable data={forecasting} />
                    </Box>

                </Box>
            </Box>

        </div>
    );
}

export default Forcasting;
