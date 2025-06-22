import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";


const Chart = (props) => {

    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false]);

    const [chartType, setChartType] = useState("scatter"); //состояние типа диаграммы

    const handleSubmit = (event) => {        
        event.preventDefault();
        const oyValues = [event.target["oy"][0].checked, event.target["oy"][1].checked];    //проверяем выбраны ли данные оси ОУ
        
        //если ничего не выбрали - alert
        if (!oyValues[0] && !oyValues[1]) {
            alert("Не выбраны значения по оси OY");
            return;
        }

        setOx(event.target["ox"].value); 
		setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);
        setChartType(event.target["chartType"].value);
	}

    const createArrGraph =(data, key)=>{   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];

        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Количество серий']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }

        //сортировка по годам
        if (key === "Год выпуска") {
            arrGraph.sort((a, b) => a.labelX - b.labelX);
        }

        return arrGraph;
    }

    return (
     <>
     <details>
       <summary>График</summary>
       <form onSubmit={ handleSubmit}>
         <p> Значение по оси OX: </p>
         <div>
           <input type="radio" name="ox" value="Страна"  defaultChecked={ ox === "Страна" }/>
           Страна
           <br/>		
           <input type="radio" name="ox" value="Год выпуска" />
           Год выпуска
           <br/>
           <input type="radio" name="ox" value="Тип Аниме" />
           Тип Аниме
         </div>
 
         <p> Значение по оси OY </p>
         <div>
           <input type="checkbox" name="oy" defaultChecked={ oy[0] === true }/>
           Максимальное число серий <br/>
           <input  type="checkbox" name="oy" />
           Минимальное число серий
         </div>

         <p>Тип диаграммы:</p>
         <select name="chartType" defaultValue={chartType}>
           <option value="scatter">Точечная диаграмма</option>
           <option value="bar">Гистограмма</option>
         </select>
 
         <p>  
           <button type="submit">Построить </button>
         </p>
       </form>   
       <ChartDraw data={ createArrGraph(props.data, ox)} oy={oy} chartType={chartType} />
      </details> 
     </>
     )
 }
 
 export default Chart;