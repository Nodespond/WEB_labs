import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState } from 'react';

const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);
    
    const [resetTrigger, setResetTrigger] = useState(false);

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1"); //при фильтрации на 1 страницу
        if (value.length === props.data.length)
            setResetTrigger(prev => !prev); //сброс сортировки
    };

    //функция сортировки
    const handleSort = (sortOptions) => {
        const sortedData = [...dataTable].sort((a, b) => {
            for (const option of sortOptions) {
                const { field, order } = option;
                let compareResult = 0;
                
                if (field === "Год выпуска" || field === "Количество серий") {
                    //числа
                    compareResult = a[field] - b[field];
                } else {
                    //строки
                    const valA = String(a[field]).toLowerCase();
                    const valB = String(b[field]).toLowerCase();
                    compareResult = valA.localeCompare(valB);
                }
                
                if (compareResult !== 0) {
                    return order ? -compareResult : compareResult;
                }
            }
            return 0;
        });
        
        setDataTable(sortedData);
    };

    const handleResetSort = () => {
        setDataTable(props.data);
        setActivePage("1");
        setResetTrigger(prev => !prev); // сброс фильтра
    };

    const amountRows = props.showPagination ? props.amountRows : dataTable.length;
    
    //dataTable для расчета страниц
    const n = Math.ceil(dataTable.length / amountRows); 
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const changeActive = (event) => {
        setActivePage(event.target.textContent.trim());
    };
    
    const pages = arr.map((item, index) =>  
        <span 
            key={index} 
            className={activePage === item.toString() ? "current-page" : ""}
            onClick={changeActive}
        > 
            {item} 
        </span>
    );

    return( 
        <>

        <Filter filtering={updateDataTable} 
                data={dataTable} 
                fullData={props.data}
                resetTrigger={resetTrigger}/>
        
        <Sort 
            columns={Object.keys(props.data[0])} 
            onSort={handleSort}
            onReset={handleResetSort}
            resetTrigger={resetTrigger}
        />

        <table>
            <TableHead head={Object.keys(props.data[0])} />
            <TableBody 
                body={dataTable} 
                amountRows={amountRows} 
                numPage={activePage}
            />
        </table>

        {props.showPagination && dataTable.length > 0 && (
            <div className="pagination">
                {pages}
            </div>
        )}
        {dataTable.length === 0 && <p>Нет данных, соответствующих фильтрам</p>}
        </>   
    )   
}

export default Table;