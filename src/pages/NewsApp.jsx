import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Tabs, Tab, Card, CardMedia, CardContent, CardActions, Button, IconButton, InputAdornment, TextField, Pagination } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon, Home as HomeIcon } from '@mui/icons-material';
import axios from 'axios';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NewsApp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const clickSound = new Howl({ src: ['/assets/button.wav'] });

  const [categories] = useState(["Entertainment", "Technology", "Sports", "Business", "Health", "Science"]);
  const [selectedCategorie, setSelectedCategorie] = useState(0);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [savedArticles, setSavedArticles] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    fetchData();
  }, [selectedCategorie]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedArticles')) || [];
    setSavedArticles(saved);
  }, []);

  const handleTabChange = (event, newValue) => {
    clickSound.play();
    setSelectedCategorie(newValue);
    setSearchValue('');
  };

  const fetchData = async () => {
    const category = categories[selectedCategorie].toLowerCase();
    const url = `https://newsapi.org/v2/top-headlines?country=fr&category=${category}&apiKey=8e98e8216c394a19a59d5f836709c690`;
    try {
      const response = await axios.get(url);
      setNews(response.data.articles);
      console.log(news)
      setFilteredNews(response.data.articles);
      setPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setFilteredNews(
      news.filter(article =>
        article.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleClearSearch = () => {
    clickSound.play();
    setSearchValue('');
    setFilteredNews(news);
  };

  const handleSaveArticle = (article) => {
    clickSound.play();
    const updatedSavedArticles = [...savedArticles, article];
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastArticle = page * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredNews.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <TextField
          fullWidth
          value={searchValue}
          placeholder="Search for articles..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <ClearIcon color="secondary" />
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={handleSearchChange}
          sx={{
            mb: 4,
            width: { xs: '100%', md: '70%' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.info.main,
              },
            },
          }}
        />
        <Tabs value={selectedCategorie} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" centered sx={{ width: { xs: '100%', md: '70%' }, mb: 4 }}>
          {categories.map((categorie, index) => (
            <Tab key={index} label={categorie} sx={{
              color: selectedCategorie === index ? theme.palette.primary.main : theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.info.main,
              }
            }} />
          ))}
        </Tabs>
      </Grid>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={8}>
          <IconButton onClick={() => navigate('/Home')} sx={{ mb: 2 }}>
            <HomeIcon color="secondary" />
          </IconButton>
          <Paper sx={{ padding: '30px', borderRadius: '20px', backgroundColor: theme.palette.background.paper }}>
            <Grid container spacing={3}>
              {currentArticles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 4,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    },
                    borderRadius: '15px'
                  }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={article.urlToImage || 'https://via.placeholder.com/150'}
                      alt={article.title}
                      sx={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ color: theme.palette.info.main, fontWeight: 'bold', mb: 1 }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {article.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Button size="small" color="primary" onClick={() => window.open(article.url, '_blank')}>
                        Read More
                      </Button>
                      <Button size="small" color="secondary" onClick={() => handleSaveArticle(article)}>
                        Save
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(filteredNews.length / articlesPerPage)}
              page={page}
              onChange={handlePaginationChange}
              sx={{ mt: 4, display: 'flex', justifyContent: 'center', '& .Mui-selected': { color: theme.palette.primary.main, fontWeight: 'bold' } }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsApp;
