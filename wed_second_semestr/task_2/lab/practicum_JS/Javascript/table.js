//выводим таблицу на страницу
let createTable = (data, idTable) => {
	//находим таблицу
	let table = document.getElementById(idTable);
	
	//формируем заголовочную строку из ключей нулевого элемента массива
	let tr = document.createElement('tr');

	for(key in data[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}

	table.append(tr);	
	
	//самостоятельно сформировать строки таблицы на основе массива data
	data.forEach((item) => {
           //новая строка таблицы tr
           let tr = document.createElement('tr');
           //перебор ключей очередного элемента массива
           for (let key in item) {
               let td = document.createElement('td');
               td.innerHTML = item[key];
               tr.append(td);
           }
           table.append(tr);
	});	
}
//очищаем таблицу
let clearTable = (idTable) => {
    let table = document.getElementById(idTable);

    if (table) {
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }
    } else {
      console.error(`Таблица с ID "${idTable}" не найдена.`);
    }
  }