import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../UI/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'; // Add loader
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import NoImage from "../../png/No-Image.png";
import { Twemoji } from 'react-emoji-render'; // Add animated emojis

function NewsWithSen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State for loader
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ad440fcf18e94c21858bcf95cbfa2246");
                const articles = res.data.articles;
                // Analyze sentiment for each article
                const analyzedArticles = await Promise.all(articles.map(async (article) => {
                    const sentimentRes = await axios.post("http://localhost:5000/news", { news_text: article.title });
                    const sentiment = sentimentRes.data.sentiment;
                    return { ...article, sentiment };
                }));
                setData(analyzedArticles);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        getNews();
    }, []);

    // Function to map sentiment labels to emojis
    const getSentimentEmoji = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return '😊';
            case 'negative':
                return '😔';
            default:
                return '😐';
        }
    };

    return (
        <Box>
            <NavBar />
            {loading ? ( // Show loader when loading
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '1rem', padding: '3rem' }}>
                    <Grid container spacing={2} style={{ maxWidth: '1000px' }}>
                        {data.map((article, index) => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={index} sx={{ margin: '0 auto' }}>
                                <Card sx={{
                                    height: '100%',
                                    marginTop: '40px',
                                    bgcolor: `${colors.primary[800]}`,
                                    border: `0.5px solid ${colors.primary[700]}`,
                                    boxShadow: `0px 0px 2px 2px ${colors.primary[700]}`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    // boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)"
                                }}>
                                    {article.urlToImage ? (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={article.urlToImage}
                                            alt={article.title}
                                            style={{ objectFit: 'cover' }} // Add this style
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={NoImage}
                                            alt="No Image"
                                            style={{ objectFit: 'cover' }} // Add this style
                                        />
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {article.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {article.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontSize={20}> {/* Increase emoji font size */}
                                            <Twemoji text={getSentimentEmoji(article.sentiment)} />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" href={article.url} sx={{ color: '#ff9966' }} target="_blank">Read More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

export default NewsWithSen;
