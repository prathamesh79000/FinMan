// ReportCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

const ReportCard = ({ positiveCount, negativeCount, neutralCount, sentimentData }) => {
    const forecastingData = useSelector(state => state.forecasting.data);
    const totalCount = positiveCount + negativeCount + neutralCount;
    const positivePercentage = ((positiveCount / totalCount) * 100).toFixed(2);
    const negativePercentage = ((negativeCount / totalCount) * 100).toFixed(2);
    const neutralPercentage = ((neutralCount / totalCount) * 100).toFixed(2);

    const getRecommendation = (forecastingData) => {
        if (positivePercentage > 50) {
            return (forecastingData.length > 0 && forecastingData[0] > forecastingData[[1]]) ? "Buy" : "Hold";
        } else if (negativePercentage > 50) {
            return (forecastingData.length > 0 && forecastingData[0] < forecastingData[[1]]) ? "Sell" : "Hold";
        } else {
            return "Hold";
        }        
    };

    const recommendation = getRecommendation(forecastingData, sentimentData);

    return (
        <Card sx={{
            width:"300px",
            boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)"
        }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Sentiment Analysis Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total Articles: {totalCount}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Positive: {positiveCount} ({positivePercentage}%)
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={positivePercentage}
                    style={{ backgroundColor: '#e0e0e0', marginBottom: '8px' }}
                    color="success"
                />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Negative: {negativeCount} ({negativePercentage}%)
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={negativePercentage}
                    style={{ backgroundColor: '#e0e0e0', marginBottom: '8px' }}
                    color="error"
                />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Neutral: {neutralCount} ({neutralPercentage}%)
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={neutralPercentage}
                    style={{ backgroundColor: '#e0e0e0' }}
                />
                <Typography variant="body2" color="text.secondary" gutterBottom style={{ marginTop: '16px' }}>
                    Recommendation: {recommendation}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReportCard;
