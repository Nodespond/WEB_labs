import { Box, Container, Grid, Typography, Avatar } from '@mui/material';
import Image1 from '../images/rezero.jpg';
import Image2 from '../images/dandadan.jpg';
import Image3 from '../images/earth.jpg';
import HeroImage from '../images/heroacademy.jpg';
import structures from '../data';

const Content = () => {
  return (
    <Container sx={{ py: 4 }}>
      {/*круглые изображения*/}
      <Grid container spacing={2} sx={{ mb: 6, textAlign: 'center' }}>
        <Grid size={{xs:12 , md:4 }}>
          <Avatar
            src={Image1}
            alt="Re:Zero"
            sx={{ 
              width: 150, 
              height: 150,
              margin: '0 auto 16px',
              border: '3px solid #dee2e6'
            }}
          />
          <Typography variant="body1">Это логотип Re:Zero</Typography>
        </Grid>
        
        <Grid size={{xs:12 , md:4 }}>
          <Avatar
            src={Image2}
            alt="DanDaDan"
            sx={{ 
              width: 150, 
              height: 150,
              margin: '0 auto 16px',
              border: '3px solid #dee2e6'
            }}
          />
          <Typography variant="body1">Это логотип DanDaDan</Typography>
        </Grid>
        
        <Grid size={{xs:12 , md:4 }}>
          <Avatar
            src={Image3}
            alt="Earth"
            sx={{ 
              width: 150, 
              height: 150,
              margin: '0 auto 16px',
              border: '3px solid #dee2e6'
            }}
          />
          <Typography variant="body1">Это логотип Движение Земли</Typography>
        </Grid>
      </Grid>

      {/*абзац и изображение*/}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{xs:12 , md:8 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {structures[0].title}
          </Typography>
          <Typography>
            {structures[0].description}
          </Typography>
        </Grid>
        <Grid size={{xs:12 , md:4 }}>
          <Box
            component="img"
            src={HeroImage}
            alt="Hero Academy"
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
                    {structures[0].title}
                </Typography>
                <Typography >
                    {structures[0].description}
                </Typography>
            </Grid>
            {/*пустота чтобы как в бутстрап было образце*/}
            <Grid size={{xs:12 , md:4 }}></Grid> 
        </Grid>
    </Container>
  );
};

export default Content;