import './CSS/App.css';
import Chart from './components/Chart.js';
import buildings from './data.js';
import Table from './components/Table.js';
import { useState } from 'react';

function App() {    //в качестве пропсов передаем данные для таблицы, число строк для вывода и вывод пагинации true

  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Chart data={ filteredData } />
       <Table data={ buildings } amountRows="10" showPagination={true} onFilter={setFilteredData}/>    
    </div>
  );
}

export default App;