import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const CompanyInfo = ({ symbol }) => {
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const flaskServerURL = 'http://localhost:5000';
        axios.get(`${flaskServerURL}/company/${symbol}`)
            .then((response) => {
                const companyInfo = response.data.companyInfo;
                setCompanyInfo(companyInfo);
            })
            .catch((error) => {
                console.error('Error fetching company info:', error);
            });
    }, [symbol]);

    return (
        <Box>
            {companyInfo && (
                <div>
                    <h2>{companyInfo.company_name} ({companyInfo.symbol})</h2>
                    <p>Industry: {companyInfo.industry}</p>
                    <p>Sector: {companyInfo.sector}</p>
                    <p>Country: {companyInfo.country}</p>
                    {/* Add more company information as needed */}
                </div>
            )}
        </Box>
    );
};

export default CompanyInfo;
