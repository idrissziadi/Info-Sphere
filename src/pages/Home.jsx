import React from 'react';
import { Grid, Typography } from '@mui/material';
import DrawerAppBar from '../components/DrawerAppBar';
import image from "../assets/card.png";
import GameCard from '../components/GameCard';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Grid container direction="column" sx={{ minHeight: '100vh', backgroundColor: theme => theme.palette.background.default }}>
      {/* Header Section */}
      <Grid item>
        <DrawerAppBar title="Info Sphere" backgroundColor = {theme => theme.palette.background.paper} />
      </Grid>

      {/* Content Section */}
      <Grid item xs sx={{ paddingBottom: { xs: '40px', md: '100px' } }}>
        <Grid container sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={9.8}>
            <Grid container spacing={6}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '24px',
                    lineHeight: '36px',
                    fontWeight: 700,
                    color: theme => theme.palette.primary.main,
                    fontFamily: 'Do Hyeon, sans-serif',
                  }}
                >
                  Awesome Games Collection
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <GameCard image={image} title={"Movies"} subTitle={"Movies"} route="/movie" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <GameCard image={image} title={"Food Recipes"} subTitle={"Food Recipes"} route="/foodrecipe" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <GameCard image={image} title={"Musics"} subTitle={"Musics"} route="/lyricsfinder" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Home;
