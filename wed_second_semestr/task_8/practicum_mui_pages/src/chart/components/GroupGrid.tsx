// src/chart/components/GroupGrid.tsx
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tGroup } from "../groupdata"; 
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

type GroupProps = {
    data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
    const columns: GridColDef[] = [
        { field: 'Группа', headerName: 'Группа', flex: 1 },
        { field: 'Минимальная высота', headerName: 'Минимальная высота', flex: 0.5 },
        { field: 'Максимальная высота', headerName: 'Максимальная высота', flex: 0.5 },
        { field: 'Средняя высота', headerName: 'Средняя высота', flex: 0.5 },
    ];

    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} 
                rows={data}
                columns={columns}
                getRowId={(row) => row.id}
                showToolbar={true}
            />
        </Container>
    );
}

export default GroupGrid;