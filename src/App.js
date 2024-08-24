// App.js
import React from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Button, Paper } from '@mui/material';
import theme from './Theme'; // Importez le thème
import { Route , Routes , BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import MovieApp from './pages/MovieApp';
import FoodRecipe from './pages/FoodRecipe';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/Home' Component={Home}/>
        <Route path='/About' Component={AboutUs} />
        <Route path='/Contact' Component={ContactUs} />
        <Route path='/movie' Component={MovieApp} />
        <Route path='/foodrecipe' Component={FoodRecipe} />
        </Routes>
      </Router>
      
    </ThemeProvider>
  );
};

export default App;
