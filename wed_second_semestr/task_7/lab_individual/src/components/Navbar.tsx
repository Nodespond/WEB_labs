import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Collapse, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Лучшее', id: 'best', color: '#dc3545' },
    { text: 'Топ аниме', id: 'top', color: 'black' },
    { text: 'Таблица', id: 'table', color: 'black' },
  ];

  return (
    <AppBar   
      position="static" 
      sx={{ 
        backgroundColor: '#f8f9fa', 
        color: 'black',
        boxShadow: '1',
        borderBottom: '1px solid #dee2e6'
      }}
    >
   
    <Toolbar sx={{
    display: 'flex',
    padding: '0 1rem',
    '@media (min-width: 768px)': {
        padding: '0 2rem'
    }
    }}>
    {/*меню и заголовок*/}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography 
        variant="h6" 
        component="a" 
        href="#" 
        sx={{
            color: 'black',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: 500,
            marginRight: '1rem'
        }}
        >
        Топ аниме
        </Typography>

        {/*меню для больших экранов*/}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {navItems.map((item) => (
            <Button
            key={item.id}
            href="#"
            sx={{
                color: item.id === 'best' ? '#dc3545' : '#555',
                textTransform: 'none',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                margin: '0 0.25rem',
                '&:hover': {
                    color: item.id === 'best' ? '#a00' : '#000',
                    background:'transparent'
                }
            }}
            >
            {item.text}
            </Button>
        ))}
        </Box>
    </Box>

    {/*кнопка меню*/}
    <IconButton
        color="inherit"
        aria-label="open menu"
        edge="end"
        onClick={handleDrawerToggle}
        sx={{ 
        display: { md: 'none' },
        marginLeft: 'auto',
        color: 'black',
        padding: '0.25rem 0.75rem',
        border: '1px solid #6c757d',
        borderRadius: '0.25rem',
        backgroundColor: '#6c757d'
        }}
    >
        <MenuIcon sx={{ color: 'white' }} />
    </IconButton>
    </Toolbar>

      {/*меню на малых экранах*/}
      <Collapse
        in={mobileOpen} 
        sx={{ 
          width: '100%',
          order: 4,
          display: { md: 'none' }
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.id}
              component="a" 
              href="#"
              sx={{
                padding: '0.5rem 1rem',
                color: item.id === 'best' ? '#dc3545' : '#555',
                '&:hover': {
                    color: item.id === 'best' ? '#a00' : '#000',
                    background:'transparent'
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </AppBar>
  );
};

export default Navbar;