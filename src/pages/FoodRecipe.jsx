import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Card, CardContent, CardMedia, CardActions, Button, TextField, InputAdornment, IconButton, Dialog, DialogContent, DialogActions, Slide, AppBar, Toolbar, Pagination, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Howl } from 'howler';


const clickSound = new Howl({ src: ['/assets/button.wav'] });

const FoodRecipe = () => {
    const [searchValue, setSearchValue] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const recipesPerPage = 6;
    const theme = useTheme();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
                const data = await response.json();
                if (data.meals) {
                    setRecipes(data.meals);
                } else {
                    console.error('No recipes found');
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    const handleClear = () => {
        setSearchValue("");
        setRecipes([]);
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        setCurrentPage(1);
    };

    const openRecipeDialog = (recipe) => {
        setSelectedRecipe(recipe);
        setDialogOpen(true);
    };

    const closeRecipeDialog = () => {
        setSelectedRecipe(null);
        setDialogOpen(false);
        clickSound.play();
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const handleAddToFavorites = (recipe) => {
        setFavorites([...favorites, recipe]);
        playSound('/assets/button.wav');
    };

    const handleGoHome = () => {
        navigate('/Home'); // Redirect to the Home route
        clickSound.play();
    };

    return (
        <Grid container minHeight={"100vh"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: theme.palette.background.default }}>
            <Grid item xs={12} sm={10} md={8}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main }}>Food Recipe App</Typography>
                <Paper sx={{ padding: "30px", borderRadius: "15px", background: theme.palette.secondary.main }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                placeholder="Search recipes..."
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
                                {currentRecipes.map((recipe) => (
                                    <Grid key={recipe.idMeal} item xs={12} sm={6} md={4}>
                                        <Card sx={{ display: "flex", flexDirection: "column", height: '100%', background: theme.palette.background.paper }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={recipe.strMealThumb}
                                                alt={recipe.strMeal}
                                            />
                                            <CardContent>
                                                <Typography variant="h6">{recipe.strMeal}</Typography>
                                                <Typography variant="body2" color="textSecondary">{recipe.strArea}</Typography>
                                                <Rating value={4} readOnly />
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: "space-between" }}>
                                                <Button onClick={() => {openRecipeDialog(recipe) ; clickSound.play()}} startIcon={<PlayArrowIcon />}>Details</Button>
                                                <IconButton onClick={() => handleAddToFavorites(recipe)} color="secondary">
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
                                count={Math.ceil(recipes.length / recipesPerPage)}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleGoHome}>
                                Go to Home
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Recipe Dialog */}
            <Dialog
                fullScreen
                open={dialogOpen}
                onClose={closeRecipeDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: theme.palette.primary.main }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeRecipeDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {selectedRecipe && selectedRecipe.strMeal}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <CardMedia
                        component="img"
                        height="300"
                        image={selectedRecipe && selectedRecipe.strMealThumb}
                        alt={selectedRecipe && selectedRecipe.strMeal}
                    />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {selectedRecipe && selectedRecipe.strInstructions}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeRecipeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default FoodRecipe;
