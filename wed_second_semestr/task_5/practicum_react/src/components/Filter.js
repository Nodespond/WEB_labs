const Filter = (props) => {
    const handleSubmit = (event) => {        
        event.preventDefault();        

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [
                event.target["year_min"].value || 0,
                event.target["year_max"].value || Infinity
            ],
            "Высота": [
                event.target["height_min"].value || 0,
                event.target["height_max"].value || Infinity
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