document.addEventListener('DOMContentLoaded', function() { //Ждем загрузки DOM

  //создаем таблицу
  createTable(buildings, 'list');

  //получаем форму сортировки
  let sortForm = document.getElementById('sort');
    //получаем кнопку сортировки
  let sortButton = document.querySelector('input[value="Сортировать"]');
    if (sortButton) {
        sortButton.addEventListener('click', function() {
            let sortForm = document.getElementById('sort');
            if (sortForm) {
                sortTable('list', sortForm);
            } else {
                console.error("Форма с id 'sort' не найдена.");
            }
        });
    } else {
        console.error("Кнопка 'Сортировать' не найдена.");
    }

  //заполняем выбор сортировки
  if (buildings && buildings.length > 0 && sortForm) {
      setSortSelects(buildings[0], sortForm); 
  } else {
      console.error("Массив 'buildings' не определен или пуст, или форма сортировки не найдена.");
  }

  //элементы select из формы для сортировки
  let fieldsFirst = document.getElementById('fieldsFirst');
  let fieldsSecond = document.getElementById('fieldsSecond');

    //при изменении первого поля со списком вызываем функцию для настройки следующего
  if(fieldsFirst && fieldsSecond) {
      fieldsFirst.addEventListener('change', function() {
          changeNextSelect('fieldsSecond', this);
      });
  } else {
      console.error("Элементы select  'fieldsFirst' или 'fieldsSecond' не найдены.");
  }

  //обработчик кнопки найти
  let findButton = document.querySelector('input[value="Найти"]');
  if (findButton) { 
      findButton.addEventListener('click', function() {
          let filterForm = document.getElementById('filter');
          let sortFix = document.getElementById('sort');
          if (filterForm) {
              filterTable(buildings, 'list', filterForm);    
              sortTable('list', sortFix);
          } else {
              console.error("Форма с id 'filter' не найдена.");
          }
      });
  } else {
      console.error("Кнопка 'Найти' не найдена.");
  }

   //обработчик кнопки "Сбросить сортировку"
    let resetSortButton = document.querySelector('input[value="Сбросить сортировку"]');
    if (resetSortButton) {
        resetSortButton.addEventListener('click', function() {
            let sortForm = document.getElementById('sort');
            if (sortForm) {
                resetSort('list', buildings, sortForm);
                let filterformm = document.getElementById('filter');
                filterformm.reset();
            } else {
                console.error("Форма с id 'sort' не найдена.");
            }
        });
    } else {
        console.error("Кнопка 'Сбросить сортировку' не найдена.");
    }

  //обработчик кнопки "Очистить фильтры"
  let clearFiltersButton = document.querySelector('input[value="Очистить фильтры"]');
  if (clearFiltersButton) { 
      clearFiltersButton.addEventListener('click', function() {
          let filterForm = document.getElementById('filter');
          if(filterForm){
              filterForm.reset();
              let sortForm = document.getElementById('sort');
              resetSort('list', buildings, sortForm);
          }
          clearTable('list');
          createTable(buildings, 'list'); 
      });
  } else {
      console.error("Кнопка 'Очистить фильтры' не найдена.");
  }
});

//формирование полей элемента списка сортировки

let createOption = (str, val) => {
  let item = document.createElement('option');
  item.text = str;
  item.value = val;
  return item;
}

//формирование поля со списком 
//параметры – массив со значениями элементов списка и элемент select
let setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    //создаем OPTION 'Нет' и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    for (let i in arr) {
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}
//формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => { 
  //выделяем ключи словаря в массив
  let head = Object.keys(data);
  // находим все SELECT в форме
  let allSelect = dataForm.getElementsByTagName('select');
    //для каждого заполняем селект
  for(let j = 0; j < allSelect.length; j++) {
      setSortSelect(head, allSelect[j]);
      //САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
      if (j > 0) {
          allSelect[j].disabled = true;
      }
  }
}

//настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {
  let nextSelect = document.getElementById(nextSelectId);
  nextSelect.disabled = false;
  //в следующем SELECT выводим те же option, что и в текущем
  nextSelect.innerHTML = curSelect.innerHTML;
  // удаляем в следующем SELECT уже выбранную в текущем опцию
  // если это не первая опция - отсутствие сортировки
  if (curSelect.value != 0) {
     nextSelect.remove(curSelect.value);
  } else {
      nextSelect.disabled = true;
  }
}

//функция сброса сортировки
function resetSort(idTable, data, dataForm) {
  //очищаем все поля формы
  dataForm.reset();
  //заполняем select option из structures
  setSortSelects(buildings[0], dataForm);
  clearTable(idTable);
  createTable(data, idTable);
}