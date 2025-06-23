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
          Топ самых лучших аниме 
        </Typography>
        <Typography variant="body2" align="center">
          Автор страницы : Родохлеб В.А.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;