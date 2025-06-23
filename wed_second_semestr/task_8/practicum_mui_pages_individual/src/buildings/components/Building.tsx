import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import structures from "../../data";
import Navbar from '../../components/Navbar';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


function Building() {
    const { id } = useParams();
    const item = structures[Number(id) || 0];       //находим элемент в массиве structures по id

    return (//в навигации ничего не выделяем
        <>
            <Navbar active="" />        

            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 }, mt: '28px'}}>
                <Box>
                    <Breadcrumbs 
                        separator={<NavigateNextIcon />} 
                    >
                        <Link 
                            to="/" 
                            style={{
                                color:"blue",
                                textDecoration: 'none',
                                fontWeight: 500,
                            }}
                            >
                            Главная
                            </Link>
                        <Typography color="text.primary" sx={{ fontWeight: 'medium' }}>
                            {item.title}
                        </Typography>
                    </Breadcrumbs>
                </Box>
            </Container>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    sx={{ 
                        textAlign: 'center', 
                        color: 'text.secondary',
                        mb: 4,
                        fontWeight: 'medium'
                    }}
                >
                    {item.title}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Box sx={{ 
                            maxWidth: '800px', 
                            width: '100%',
                            border: '1px solid #e0e0e0', //рамка
                            overflow: 'hidden' //обрезка по краям
                        }}>
                        <img
                            src={item.img}
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    {item.description.map((paragraph, index) => (
                        <Grid key={index} size={{ xs: 12, md: 6 }} >
                            <Typography variant="body1">
                                {paragraph}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Building;