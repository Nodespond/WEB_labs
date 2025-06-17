import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';

function App() {    //в качестве пропсов передаем данные для таблицы, число строк для вывода и вывод пагинации true
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Table data={ buildings } amountRows="10" showPagination={true}/>    
    </div>
  );
}

export default App;