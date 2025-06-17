import { useEffect } from "react";

const Filter = (props) => {
    const handleSubmit = (event) => {        
        event.preventDefault();        

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип Аниме": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Год выпуска": [
                event.target["year_min"].value || 0,
                event.target["year_max"].value || 2100
            ],
            "Количество серий": [
                event.target["height_min"].value || 0,
                event.target["height_max"].value || 10000
            ]
        };
            
        let arr = props.fullData;
        for(const key in filterField) {
            if (Array.isArray(filterField[key])) {
                //фильтруем по числовым полям
                const [min, max] = filterField[key];
                arr = arr.filter(item => 
                    item[key] >= Number(min) && item[key] <= Number(max)
                );
            } else {
                //фильтруем по строковым полям
                arr = arr.filter(item => 
                    item[key].toLowerCase().includes(filterField[key])
                );
            }
        }  
                
        props.filtering(arr);
    }

    const handleReset = () => {
        props.filtering(props.fullData);
    }

    useEffect(() => {   //отслеживаем изменение триггера и сбрасываем фильтрацию
      if (props.resetTrigger) {
        document.querySelector('form').reset();   //находим форму 1 ичистим
      }
    }, [props.resetTrigger]);

    return (
      <details>
        <summary>Фильтр</summary>
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
            <label>Год выпуска: от </label>
            <input name="year_min" type="number" min="0" />
            <label> до </label>
            <input name="year_max" type="number" min="0" />
          </p>
          <p>
            <label>Количество серий:  от </label>
            <input name="height_min" type="number" min="0" />
            <label> до </label>
            <input name="height_max" type="number" min="0" />
          </p>
          <p>         
            <button type="submit">Найти</button>
            <button type="reset">Очистить фильтр</button>
          </p>  
        </form> 
      </details>
    )
}

export default Filter;