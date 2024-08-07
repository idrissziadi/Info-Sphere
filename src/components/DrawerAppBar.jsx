import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Logo from './../assets/logo.png';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const drawerWidth = 240;

const navItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'About Us', icon: <InfoIcon />, path: '/about' },
  { text: 'Contact Us', icon: <ContactMailIcon />, path: '/contact' },
];

function DrawerAppBar(props) {
  const { window, title, titleIcon: TitleIcon, backgroundColor } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme(); // Access the theme

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleTabChange = (event, newValue) => {
    navigate(navItems[newValue].path);
    setMobileOpen(false);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: backgroundColor || theme.palette.background.default }}>
        <Toolbar>
          <IconButton
            color="#FFF"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: "#FFF" }}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="Logo" style={{ marginRight: '0px'  , marginBottom : "5px"}} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',

              fontSize: '28px',
              lineHeight: '42px',
              fontWeight: 700,
              color: "#FFF",
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, ml: 'auto' }}>
            <Tabs
              value={navItems.findIndex(item => item.path === location.pathname)}
              onChange={handleTabChange}
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: 'flex-end',
                  gap: 2
                },
                "& .MuiTab-root": {
                  minWidth: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                },
                "& .MuiTab-root .MuiSvgIcon-root": {
                  mr: 1,
                },
              }}
            >
              {navItems.map((item, index) => (
                <Tab
                  key={item.text}
                  label={item.text}
                  sx={{
                    alignItems: 'flex-start',
                    
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                    '&.Mui-selected': {
                      fontWeight: 700,
                      color: '#FFF', // Set selected tab text color to black
                      '& .MuiSvgIcon-root': {
                        color: '#FFF', // Set selected tab icon color to black
                      },
                      '&::after': {
                        content: '""',
                        display: 'block',
                        width: '100%',
                        height: '4px',
                        background: '#FFF', // Set selected tab underline color to black
                        borderRadius: '2px',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      },
                    },
                    '& .MuiSvgIcon-root': {
                      color: theme.palette.text.secondary,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            {navItems.map((item) => (
              <Box
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                {item.icon}
                <Typography sx={{ ml: 2 }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.element,
  backgroundColor: PropTypes.string,
};

export default DrawerAppBar;
