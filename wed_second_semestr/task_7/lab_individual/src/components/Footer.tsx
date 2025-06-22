import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body1" align="center">
          Самые лучшие аниме
        </Typography>
        <Typography variant="body1" align="center">
          Автор: Родохлеб Владислав 
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;