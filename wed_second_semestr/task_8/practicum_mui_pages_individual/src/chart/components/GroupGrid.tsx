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
        { field: 'Минимальное число серий', headerName: 'Минимальное число серий', flex: 0.5 },
        { field: 'Максимальное число серий', headerName: 'Максимальное число серий', flex: 0.5 },
        { field: 'Среднее количество серий', headerName: 'Среднее количество серий', flex: 0.5 },
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