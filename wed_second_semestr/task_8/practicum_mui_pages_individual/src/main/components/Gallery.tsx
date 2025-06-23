import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import structures from "../../data";
import { Link} from 'react-router-dom';
import { Grid } from '@mui/material';

// function Gallery() {
//     return ( //там линк на картинку
//         <Container maxWidth="lg">
//             <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto'}}>
//                 <ImageList 
//                     variant="masonry" 
//                     sx={{
//                         columnCount: {
//                           xs: '1 !important',
//                           sm: '2 !important',
//                           md: '3 !important',
//                           lg: '4 !important',
//                         },
//                       }}  
//                       gap={ 8 }>
//                     {imgData.map((item, index) => (
//                         <Link to={`/building/${index}`}> 
//                         <ImageListItem key={item.img}>             
//                                 <img
//                                     srcSet={ item.img }
//                                     src={ item.img }
//                                     alt={ item.title }
//                                     loading="lazy"
//                                 />
//                                 <ImageListItemBar position="bottom" title={ item.title } />
                            
//                         </ImageListItem>
//                         </Link>
//                     ))}
//                 </ImageList>
//             </Box>
//         </Container>
//     );
//   }
  
//   export default Gallery;


const Gallery = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {/*левое изображение*/}
            <Grid size={{xs:12 , md:6}}>
                <Link to={`/building/${structures[0].index}`}>
                    <Box
                        component="img"
                        src={structures[0].img}
                        alt="Alximik"
                        sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',   //обрезка изображения
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                        }}
                    />
                </Link>
            </Grid>

        {/*правые изображения*/}
        <Grid size={{xs:12 , md:6}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link to={`/building/${structures[1].index}`}>
                <Box
                component="img"
                src={structures[1].img}
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
            </Link>
            <Link to={`/building/${structures[2].index}`}>
                <Box
                component="img"
                src={structures[2].img}
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
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Gallery;