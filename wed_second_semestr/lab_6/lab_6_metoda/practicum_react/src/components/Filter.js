const Filter = (props) => {
  //отправка отправки формы
    const handleSubmit = (event) => {        
        event.preventDefault();        //отмена перезагрузки страницы

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),  //достаем значения из формы
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [
                event.target["year_min"].value || 0,
                event.target["year_max"].value || 2100
            ],
            "Высота": [
                event.target["height_min"].value || 0,
                event.target["height_max"].value || 10000
            ]
        };
            //начинаем с исх.данных
        let arr = props.fullData;
        //фильтруем последовательно
        for(const key in filterField) {
            if (Array.isArray(filterField[key])) {    //если значение массив
                //фильтруем по числовым полям
                const [min, max] = filterField[key];
                arr = arr.filter(item => 
                    item[key] >= Number(min) && item[key] <= Number(max)  //по диапазону
                );
            } else {
                //фильтруем по строковым полям
                arr = arr.filter(item => 
                    item[key].toLowerCase().includes(filterField[key])  //ищем по строке
                );
            }
        }  
                //передаем отфильтрованные данные
        props.filtering(arr);
    }
    //сброс фильтра
    const handleReset = () => {
        props.filtering(props.fullData); //передаем просто все данные исходные
    }

    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label>Название:</label>
          <input name="structure" type="text" />
        </p>  
        <p>
          <label>Тип:</label>        
          <input name="type" type="text" />
        </p>
        <p>
          <label>Страна:</label>
          <input name="country" type="text" />
        </p>
        <p>
          <label>Город:</label>
          <input name="city" type="text" />
        </p>
        <p>
          <label>Год от:</label>
          <input name="year_min" type="number" min="0" /><br></br><br></br>
          <label>Год до:</label>
          <input name="year_max" type="number" min="0" />
        </p>
        <p>
          <label>Высота от:</label>
          <input name="height_min" type="number" min="0" /><br></br><br></br>
          <label>Высота до:</label>
          <input name="height_max" type="number" min="0" />
        </p>
        <p>         
          <button type="submit">Фильтровать</button>   
          <button type="reset">Очистить фильтр</button>
        </p>  
      </form> 
    )
}

export default Filter;