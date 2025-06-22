import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from 'react';       //для управления состояния

const Table = (props) => {      
    const [activePage, setActivePage] = useState("1");      //состояния страницы (по умолчанию 1 страница вывода)
    const [dataTable, setDataTable] = useState(props.data);     //состояние данных таблицы - изначально что в пропсе 

    const updateDataTable = (value) => {
        setDataTable(value);        //обновляем с учетом фильтрации
        setActivePage("1"); //при фильтрации на 1 страницу перенаправляем
        props.onFilter(value); //отфильтрованные данные шлем в App.js
    };

    const amountRows = props.showPagination ? props.amountRows : dataTable.length;   //логика отображения строк таблицы
    
    //dataTable для расчета страниц
    const n = Math.ceil(dataTable.length / amountRows);     //число страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1); //массив номеров страниц

    const changeActive = (event) => {
        setActivePage(event.target.textContent.trim());     //возвращаем содержимое span - номер 
    };
    
    const pages = arr.map((item, index) =>      //генерируем кнопки пагинации
        <span 
            key={index} //ключ 
            className={activePage === item.toString() ? "current-page" : ""}  //подсветка номер текущего
            onClick={changeActive}      //обработчик клика
        > 
            {item} 
        </span>
    );

    return( 
        <>
        <h4>Фильтры</h4>
        <Filter filtering={updateDataTable} //обновление данных
                data={dataTable} //текущие данные по которым строим таблицу
                fullData={props.data}/> 
        <table>
            <TableHead head={Object.keys(props.data[0])} />
            <TableBody 
                body={dataTable} //отображаемые данные
                amountRows={amountRows}     //количество строк
                numPage={activePage}    //тек. стр
            />
        </table>

        {props.showPagination && n > 1 && (//вывод пагинации
            <div className="pagination">
                {pages}
            </div>
        )}
           
        </>   
    )   
}

export default Table;