import { Box, Container, Grid } from '@mui/material';
import Image1 from '../images/alximik1.jpg';
import Image2 from '../images/bleach1.jpg';
import Image3 from '../images/deathnote1.jpg';

const Gallery = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {/*левое изображение*/}
        <Grid size={{xs:12 , md:6}}>
          <Box
            component="img"
            src={Image1}
            alt="Alximik"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Grid>

        {/*правые изображения*/}
        <Grid size={{xs:12 , md:6}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              component="img"
              src={Image2}
              alt="Bleach"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            <Box
              component="img"
              src={Image3}
              alt="Death Note"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Gallery;