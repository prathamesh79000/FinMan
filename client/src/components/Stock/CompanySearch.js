import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import companyData from './companyData.json';
import PlotlyGraph from './PlotlyGraph';
import Forcasting from './Forcasting';
import FlexBetween from '../UI/FlexBetween';
import NewsForCompany from '../News/NewsForCampany';

const CompanySearch = () => {
    const [selectedCompany, setSelectedCompany] = useState('Apple Inc.');
    const [symbol, setSymbol] = useState('AAPL');
   

    useEffect(() => {
        // Fetch data when selected company changes
        if (selectedCompany) {
            setSymbol(companyData.companies[selectedCompany]); // Set symbol based on selected company
        }
    }, [selectedCompany]);

    const handleCompanySelect = (event, newValue) => {
        if (newValue) {
            setSelectedCompany(newValue);
        }
    };

    return (
        <Box>
            <FlexBetween sx={{ flexDirection: 'column', m: 2 }}>
                <Box sx={{ width: 300 }}>
                    <Autocomplete
                        id="company-search"
                        options={Object.keys(companyData.companies)}
                        value={selectedCompany}
                        onChange={handleCompanySelect}
                        renderInput={(params) => (
                            <TextField {...params} label="Search Company" variant="outlined" />
                        )}
                    />
                </Box>

                <FlexBetween gap={10} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Box style={{ flex: 1 }}>
                        {symbol && <PlotlyGraph symbol={symbol} />}
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <Forcasting symbol={symbol}/>
                    </Box>
                </FlexBetween>
                <Box sx={{width:'100vw'}}>
                <NewsForCompany symbol={symbol} />

                </Box>
                
            </FlexBetween>
        </Box>
    );
};

export default CompanySearch;
