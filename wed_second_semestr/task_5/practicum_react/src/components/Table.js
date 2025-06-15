import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from 'react';

const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1"); //при фильтрации на 1 страницу
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
        <h4>Фильтры</h4>
        <Filter filtering={updateDataTable} 
                data={dataTable} 
                fullData={props.data}/>
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