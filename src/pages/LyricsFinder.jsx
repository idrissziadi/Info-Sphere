import React, { useState, useEffect } from 'react';
import {
    Grid, IconButton, InputAdornment, Paper, TextField, Typography, 
    Card, CardContent, CardMedia, CardActions, Button, CircularProgress, 
    Alert, Pagination
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
import { useTheme } from '@mui/material/styles';

const LyricsFinder = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const [tracks, setTracks] = useState([]);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const [page, setPage] = useState(1);
    const tracksPerPage = 8;

    const clickSound = new Howl({ src: ['/assets/button.wav'] });

    useEffect(() => {
        setFilteredTracks(tracks);
    }, [tracks]);

    const handleClear = () => {
        clickSound.play();
        setSearchValue('');
        setFilteredTracks(tracks);
        setError(null);
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        if (value === '') {
            setFilteredTracks(tracks);
        } else {
            setFilteredTracks(tracks.filter(track =>
                track.title.toLowerCase().includes(value.toLowerCase()) ||
                track.artist.toLowerCase().includes(value.toLowerCase())
            ));
        }
    };

    const handlePlayClick = (track) => {
        clickSound.play();
        navigate('/musicplayer', { state: { track } });
    };

    const handleSearchClick = () => {
        clickSound.play();
        if (searchValue) {
            setRecentSearches(prev => [...new Set([searchValue, ...prev])].slice(0, 5));
        }
    };

    const handleRecentSearchClick = (search) => {
        clickSound.play();
        setSearchValue(search);
    };

    const handleHomeClick = () => {
        clickSound.play();
        navigate('/Home');
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (searchValue !== '') {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`https://api.lyrics.ovh/suggest/${searchValue}`);
                    if (response.data && response.data.data) {
                        const fetchedTracks = response.data.data.map(item => ({
                            title: item.title,
                            artist: item.artist.name,
                            url: item.preview,
                            image: item.album.cover_medium,
                        }));
                        setTracks(fetchedTracks);
                        setPage(1);
                    }
                } catch (error) {
                    console.error('Error fetching tracks:', error);
                    setError('Error fetching tracks, please try again later.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [searchValue]);

    const displayedTracks = filteredTracks.slice((page - 1) * tracksPerPage, page * tracksPerPage);

    return (
        <Grid container minHeight="100vh" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme.palette.background.default }}>
            <Grid item xs={12} md={8}>
                <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                value={searchValue}
                                placeholder="Search for songs or artists..."
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
                                    )
                                }}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleSearchClick();
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: theme.palette.divider,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: theme.palette.text.secondary,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: theme.palette.text.primary,
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        {recentSearches.length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant='subtitle2' color="textSecondary">Recent Searches:</Typography>
                                <Grid container spacing={1}>
                                    {recentSearches.map((search, index) => (
                                        <Grid item key={index}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleRecentSearchClick(search)}
                                            >
                                                {search}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            {loading ? (
                                <Grid container justifyContent="center">
                                    <CircularProgress />
                                </Grid>
                            ) : error ? (
                                <Alert severity="error">{error}</Alert>
                            ) : (
                                <Grid container spacing={2}>
                                    {
                                        displayedTracks.map((track, index) => (
                                            <Grid item key={index} xs={12} md={3}>
                                                <Card sx={{ backgroundColor: theme.palette.background.default, boxShadow: 3 }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="150"
                                                        image={track.image}
                                                        alt={track.title}
                                                    />
                                                    <CardContent>
                                                        <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>{track.title}</Typography>
                                                        <Typography variant='subtitle2' color="textSecondary">{track.artist}</Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            fullWidth
                                                            onClick={() => handlePlayClick(track)}
                                                            sx={{
                                                                backgroundColor: theme.palette.primary.main,
                                                                color: theme.palette.primary.contrastText
                                                            }}
                                                        >
                                                            Play
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            )}
                        </Grid>

                        {filteredTracks.length > tracksPerPage && (
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Pagination
                                    count={Math.ceil(filteredTracks.length / tracksPerPage)}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Grid>
                        )}

                        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                            <Button
                                startIcon={<HomeIcon />}
                                onClick={handleHomeClick}
                                sx={{ 
                                    backgroundColor: theme.palette.primary.main, 
                                    color: theme.palette.primary.contrastText 
                                }}
                            >
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default LyricsFinder;
