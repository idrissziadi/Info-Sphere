import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MusicPlayer = () => {
    const location = useLocation();
    const history = useNavigate();
    const { track } = location.state || {};
    const playerRef = useRef(null);
    const theme = useTheme();

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const handleGoBack = () => {
        playSound('/assets/button.wav');
        history('/Home');
    };

    return (
        <Grid container minHeight={'100vh'} justifyContent="center" alignItems="center" sx={{ backgroundColor: theme.palette.background.default }}>
            <Grid item xs={12} md={8}>
                <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.secondary.main }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} textAlign="center">
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={handleGoBack}
                                variant="contained"
                                sx={{ mb: 3, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                            >
                                Back to Home
                            </Button>
                        </Grid>
                        {track ? (
                            <>
                                <Grid item xs={12} textAlign="center">
                                    <Typography variant='h2' sx={{ color: theme.palette.primary.main }}>{track.title}</Typography>
                                </Grid>
                                <Grid item xs={12} textAlign="center">
                                    <Typography variant='h5' sx={{ color: theme.palette.primary.contrastText }}>{track.artist}</Typography>
                                </Grid>
                                <Grid item xs={12} textAlign="center" sx={{ width: '100%', height: '400px' }}>
                                    <ReactPlayer
                                        ref={playerRef}
                                        url={track.url}
                                        controls
                                        width='100%'
                                        height='100%'
                                        config={{
                                            file: {
                                                attributes: {
                                                    poster: track.image,
                                                },
                                            },
                                        }}
                                        onPlay={() => playSound('/assets/play.mp3')}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12} textAlign="center">
                                <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>No track selected</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default MusicPlayer;
