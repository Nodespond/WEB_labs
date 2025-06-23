import { Box, Container, Grid, Typography, Avatar } from '@mui/material';
import structures from '../../data';

const cardData = [structures[3], structures[4], structures[5]];

const Content = () => {
  return (
    <Container sx={{ py: 4 }}>
      {/*круглые изображения*/}
      <Grid container spacing={2} sx={{ mb: 6, textAlign: 'center' }}>
        {cardData.map((item) => (
          <Grid size={{xs:12 , md:4 }}>
            <Avatar
              src={item.img}
              alt={item.title}
              sx={{ 
                width: 150, 
                height: 150,
                margin: '0 auto 16px',
                border: '3px solid #dee2e6'
              }}
            />
            <Typography variant="body1">Это логотип {item.title}</Typography>
          </Grid>
        ))}
      </Grid>

      {/*абзац и изображение*/}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{xs:12 , md:8 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {structures[6].title}
          </Typography>
          <Typography>
            {structures[6].description}
          </Typography>
        </Grid>
        <Grid size={{xs:12 , md:4 }}>
          <Box
            component="img"
            src={structures[6].img}
            alt={structures[6].title}
            sx={{ 
              width: { xs: '50%', md: '80%' },
              boxShadow: 3,
              display:'block',
              margin:'auto'
            }}
          />
        </Grid>
      </Grid>

        {/*изображение*/}
        <Grid container spacing={4}>
            <Grid size={{xs:12 , md:8 }}> 
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {structures[6].title}
                </Typography>
                <Typography >
                    {structures[6].description}
                </Typography>
            </Grid>
            {/*пустота чтобы как в бутстрап было образце*/}
            <Grid size={{xs:12 , md:4 }}></Grid> 
        </Grid>
    </Container>
  );
};

export default Content;