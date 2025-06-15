function createArrGraph(data, key, mode='max') {   
   
    groupObj = d3.group(data, d => d[key]); 
    let arrGraph =[]; 
    for(let entry of groupObj) { 
        let heights = entry[1].map(d => d['Высота']);
        let minMax = d3.extent(heights);
        
        if (mode === 'max') {
            arrGraph.push({labelX: entry[0], values: [minMax[1]], type: 'max'});
        } else if (mode === 'min') {
            arrGraph.push({labelX: entry[0], values: [minMax[0]], type: 'min'});
        } else {
            arrGraph.push(
                {labelX: entry[0], values: [minMax[0]], type: 'min'},
                {labelX: entry[0], values: [minMax[1]], type: 'max'}
            );
        }
     } 
     return arrGraph; 
} 

 
function drawGraph(data, key="Страна", mode="max", chartType="scatter") { 
         
    // создаем массив для построения графика 
    const arrGraph = createArrGraph(data, key, mode); 
     
    let svg = d3.select("svg")   
    svg.selectAll('*').remove(); 
 
   // создаем словарь с атрибутами области вывода графика 
   attr_area = { 
        width: parseFloat(svg.style('width')), 
        height: parseFloat(svg.style('height')), 
        marginX: 50, 
        marginY: 50 
   } 
        
    // создаем шкалы преобразования и выводим оси 
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, key); 
     
    // рисуем график 
    if(chartType ==="scatter")
        createChart(svg, arrGraph, scX, scY, attr_area, mode)
    else createGistChart(svg, arrGraph, scX, scY, attr_area, mode)         
} 

function createAxis(svg, data, attr_area, key){
    // сортируем по ключу
    const sortedData = key === "Год" 
        ? [...data].sort((a, b) => a.labelX - b.labelX)
        : data;

    const [min, max] = d3.extent(sortedData.flatMap(d => d.values));

    let scaleX = d3.scaleBand()
        .domain(sortedData.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);
                     
    let scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);               
      
    // создание осей 
    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX},  
                                  ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)"); 
     
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
         
    return [scaleX, scaleY];
}


function createChart(svg, data, scaleX, scaleY, attr_area, mode) { 
    const r = 4;
    const yOffset = 2; //сдвиг точки красной при совпадении
    
    const colors = {
        'min': 'blue',
        'max': 'red',
        'both_min': 'blue',
        'both_max': 'red'
    };

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => {
            const baseY = scaleY(d.values[0]);
            //для 'both'
            if (mode === 'both' && d.type === 'max') {
                //ищем соотв. точку мин
                const minPoint = data.find(item => 
                    item.labelX === d.labelX && item.type === 'min');
                if (minPoint && minPoint.values[0] === d.values[0]) {
                    return baseY + yOffset;
                }
            }
            return baseY;
        })
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", d => {
            if (mode === 'both') return d.type === 'min' ? colors.both_min : colors.both_max;
            return colors[mode];
        });
}

function createGistChart(svg, data, scaleX, scaleY, attr_area, mode) {
    const colors = {
        'min': 'blue',
        'max': 'red',
        'both_min': 'blue',
        'both_max': 'red'
    };

     //группировка данных 
     const groupedData = d3.group(data, d => d.labelX);
    
     //для отображения столбцов настройки
     const barPadding = 0.3; 
     const innerPadding = 0; 
     
     //к каждому группированному элементу
     groupedData.forEach((values, label) => {
         const groupWidth = scaleX.bandwidth();
         const barWidth = groupWidth * (1 - barPadding) / (mode === 'both' ? 2 : 1);
         
         values.forEach((d, i) => {
             //пропуск вне режима
             if ((mode === 'min' && d.type !== 'min') || 
                 (mode === 'max' && d.type !== 'max')) return;
                 
             //позиция столбцов
             const xPos = scaleX(label) + 
                 (mode === 'both' ? 
                     (groupWidth * barPadding/2 + i * (barWidth + groupWidth * innerPadding)) : 
                     (groupWidth * barPadding/2));
             
             //всота столбцов
             const height = attr_area.height - attr_area.marginY - scaleY(d.values[0]);
             
             svg.append("rect")
                 .attr("class", "bar")
                 .attr("x", xPos + attr_area.marginX)
                 .attr("width", barWidth)
                 .attr("y", scaleY(d.values[0]))
                 .attr("height", height > 0 ? height : 0) //от отрицательных значений
                 .style("fill", colors[mode === 'both' ? `both_${d.type}` : mode])
                 .style("opacity", 0.8);
         });
     });
}