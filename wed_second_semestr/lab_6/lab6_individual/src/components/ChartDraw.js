import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    }); 
	// задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};
		
	// вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

	useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник, 		
		svg
		.append("rect")
		.attr("x", margin.left)
		.attr("y", margin.top)
		.attr("width",  boundsWidth)
		.attr("height",  boundsWidth)
		.style("fill", "lightgrey");
	});

	let [min, max] = d3.extent(props.data.map(d => d.values[1]));
		
	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    	
	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        //получаем значения для графика
        const allValues = props.data.flatMap(d => {
            const values = [];
            if (props.oy[0]) values.push(d.values[1]); // Максимальные
            if (props.oy[1]) values.push(d.values[0]); // Минимальные
            return values;
        });
        
        if (allValues.length === 0) return;
        
        const [min, max] = d3.extent(allValues);

        //шкалы для осей делаем
        const scaleX = d3.scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth])
            .padding(0.2);
        
        const scaleY = d3.scaleLinear()
            .domain([min * 0.85, max * 1.1])
            .range([boundsHeight, 0]);
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        //рисуем график
        if (props.chartType === "scatter") {
            //точечная диаграмма
            if (props.oy[0]) {
                svg.selectAll(".max-dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("class", "max-dot")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }
            
            if (props.oy[1]) {
                svg.selectAll(".min-dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("class", "min-dot")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        } else {
            //гистограмма
            const barWidth = scaleX.bandwidth() / (props.oy[0] && props.oy[1] ? 2 : 1)*0.8;
            
            if (props.oy[1]) {
                svg.selectAll(".min-bar")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", "min-bar")
                    .attr("x", d => scaleX(d.labelX))
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", barWidth)
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }

            if (props.oy[0]) {
                const offset = props.oy[1] ? barWidth : 0;
                svg.selectAll(".max-bar")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", "max-bar")
                    .attr("x", d => scaleX(d.labelX) + offset)
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", barWidth)
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }

        }

    }, [scaleX, scaleY, props.data, props.oy, props.chartType, width, height]); 

    return (
      <svg ref={chartRef} >  </svg>
	)
}

export default ChartDraw;