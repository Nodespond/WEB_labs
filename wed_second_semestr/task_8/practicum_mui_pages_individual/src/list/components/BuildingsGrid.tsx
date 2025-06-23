import buildings from "../table"; 
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import { DataGrid, GridRowsProp, GridColDef  } from "@mui/x-data-grid"; 
 
function BuildingsGrid() { 
 
    const rows: GridRowsProp = buildings; 
 
    const columns: GridColDef[] = [ 
        { field: 'Название', headerName: 'Название', flex: 0.7}, 
        { field: 'Тип Аниме', flex: 0.5}, 
        { field: 'Страна', flex: 0.5},  
        { field: 'Год выпуска' ,flex: 0.5}, 
        { field: 'Количество серий',flex: 0.5}, 
    ];  
       
    return ( 
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
          <DataGrid 
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} 
            showToolbar={true}
            rows={rows}  
            columns={columns}  
          /> 
        </Container>
  ); 
} 
 
 export default BuildingsGrid;