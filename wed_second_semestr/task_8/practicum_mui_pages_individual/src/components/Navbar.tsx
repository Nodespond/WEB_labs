import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {Link} from 'react-router-dom';
import { Collapse, List, ListItem, ListItemText } from '@mui/material';

interface ComponentProps {
    active: string;
}

const Navbar = ({ active }: ComponentProps) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);    //состояние моб. меню
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const getButtonVariant = (buttonNumber: string) => {
        return active === buttonNumber ? '#dc3545' : '#555';
    };
  
    const navItems = [
      { text: 'Лучшее', id: '1', color: '#dc3545' , link: '/' },
      { text: 'Топ аниме', id: '2', color: 'black' , link: '/list' },
      { text: 'Таблица', id: '3', color: 'black' , link: '/chart'},
    ];
  
    return (
      <AppBar   
        position="static" 
        sx={{ 
          backgroundColor: '#f8f9fa', 
          color: 'black',
          boxShadow: '3',   //тень
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
          variant="h6"    //стиль заголовка
          component="a" 
          href="#" 
          sx={{
              color: 'black',
              textDecoration: 'none', //без подчеркивания
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
                <Link to={item.link}>
                    <Button
                        key={item.id}
                        href="#"
                        sx={{
                            color: getButtonVariant(item.id),   //цвет красный или серый
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
                </Link>
          ))}
          </Box>
      </Box>
  
      {/*кнопка меню*/}
      <IconButton
          color="inherit"
          edge="end"    //по правому краю
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
  
        {/*меню на малых экранах - коллапс для выпада по образцу бутстрап*/}
        <Collapse
          in={mobileOpen} //видимость
          sx={{ 
            width: '100%',
            order: 4,
            display: { md: 'none' }
          }}
        >
          <List>
            {navItems.map((item) => (
                <Link to={item.link}>
                    <ListItem 
                            key={item.id}   //ключ
                            component="a" 
                            href="#"
                            sx={{
                            padding: '0.5rem 1rem',
                            color: getButtonVariant(item.id),
                            '&:hover': {
                                color: item.id === 'best' ? '#a00' : '#000',    //при наведении
                                background:'transparent'
                            }
                            }}
                        >
                            <ListItemText primary={item.text} />
                    </ListItem>
                </Link>
            ))}
          </List>
        </Collapse>
      </AppBar>
    );
  };
  
  export default Navbar;