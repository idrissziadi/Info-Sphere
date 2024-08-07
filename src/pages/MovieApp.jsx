// src/components/MovieApp.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/tmdb';
import { Grid, Paper, Typography, Card, CardContent, CardMedia, CardActions, Button, TextField, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Slide, AppBar, Toolbar, Pagination, Chip, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MovieApp = () => {
    const [searchValue, setSearchValue] = useState("");
    const [movies, setMovies] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const moviesPerPage = 6;
    const navigate = useNavigate();
    const theme = useTheme();
    const API_KEY = process.env.API_KEY;

    useEffect(() => {
        if (searchValue === "") return;
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/search/movie', {
                    params: {
                        query: searchValue,
                        page: currentPage
                    }
                });
                const data = response.data;
                if (data.results) {
                    setMovies(data.results);
                } else {
                    console.error('No movies found');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [searchValue, currentPage]);

    const handleClear = () => {
        setSearchValue("");
        setMovies([]);
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        setCurrentPage(1);
    };

    const openMovieDialog = async (movieId) => {
        try {
            const response = await axios.get(`/movie/${movieId}`);
            setSelectedMovie(response.data);
            setDialogOpen(true);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const closeMovieDialog = () => {
        setSelectedMovie(null);
        setDialogOpen(false);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const handleButtonClick = () => {
        playSound('/assets/button.wav');
        navigate('/home');
    };

    const handleAddToFavorites = (movie) => {
        setFavorites([...favorites, movie]);
        playSound('/assets/button.wav');
    };

    return (
        <Grid container minHeight={"100vh"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: theme.palette.background.default }}>
            <Grid item xs={12} sm={10} md={8}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main }}>Movie Search App</Typography>
                <Paper sx={{ padding: "30px", borderRadius: "15px", background: theme.palette.secondary.main }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                placeholder="Search movies..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClear}>
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                value={searchValue}
                                onChange={handleSearch}
                                onKeyPress={() => playSound('/assets/keyboard.mp3')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {currentMovies.map((movie) => (
                                    <Grid key={movie.id} item xs={12} sm={6} md={4}>
                                        <Card sx={{ display: "flex", flexDirection: "column", height: '100%', background: theme.palette.background.paper }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                            <CardContent>
                                                <Typography variant="h6">{movie.title}</Typography>
                                                <Typography variant="body2" color="textSecondary">{movie.release_date}</Typography>
                                                <Rating value={movie.vote_average / 2} readOnly />
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: "space-between" }}>
                                                <Button onClick={() => openMovieDialog(movie.id)} startIcon={<PlayArrowIcon />}>Details</Button>
                                                <IconButton onClick={() => handleAddToFavorites(movie)} color="secondary">
                                                    <FavoriteIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Pagination
                                count={Math.ceil(movies.length / moviesPerPage)}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleButtonClick}>Go to Home</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Movie Dialog */}
            <Dialog
                fullScreen
                open={dialogOpen}
                onClose={closeMovieDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: theme.palette.primary.main }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeMovieDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {selectedMovie && selectedMovie.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`https://image.tmdb.org/t/p/w500${selectedMovie && selectedMovie.poster_path}`}
                        alt={selectedMovie && selectedMovie.title}
                    />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Release Date: {selectedMovie && selectedMovie.release_date}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Overview: {selectedMovie && selectedMovie.overview}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Genre: {selectedMovie && selectedMovie.genres.map(genre => genre.name).join(', ')}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Rating: <Rating value={selectedMovie && selectedMovie.vote_average / 2} readOnly />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeMovieDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default MovieApp;
