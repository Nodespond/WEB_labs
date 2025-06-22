// Building.tsx
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, Breadcrumbs } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link'; // Импортируем Link из Material-UI с алиасом
import structures from "../../data";
import Navbar from '../../components/Navbar';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


function Building() {
    const { id } = useParams();
    const item = structures[Number(id) || 0];

    return (
        <>
            <Navbar active="" />

            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 }, mt: '28px'}}>
                <Box>
                    <Breadcrumbs 
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="nav-way"
                    >
                        <MuiLink 
                            component={RouterLink} 
                            to="/" 
                            color="primary" 
                            underline="hover"
                            sx={{ fontWeight: 'medium' }}
                        >
                            Главная
                        </MuiLink>
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
                    <Paper elevation={3} sx={{ maxWidth: '800px', width: '100%' }}>
                        <img
                            src={item.img}
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </Paper>
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