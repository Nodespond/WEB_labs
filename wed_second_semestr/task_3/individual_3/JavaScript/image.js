function drawAngrySmile(svg) {
    const angrySmile = svg.append("g")
        .attr("transform", "translate(0,0)")
        .style("stroke", "black")
        .style("stroke-width", 2);

    //квадратное лицо
    angrySmile.append("rect")
        .attr("x", -50)
        .attr("y", -50)
        .attr("width", 100)
        .attr("height", 100)
        .style("fill", "red");

    //левый глаз
    angrySmile.append("circle")
        .attr("cx", -20)
        .attr("cy", -20)
        .attr("r", 8)
        .style("fill", "white");
    
    angrySmile.append("circle")
        .attr("cx", -20)
        .attr("cy", -20)
        .attr("r", 4)
        .style("fill", "black");

    //правый глаз
    angrySmile.append("circle")
        .attr("cx", 20)
        .attr("cy", -20)
        .attr("r", 8)
        .style("fill", "white");
    
    angrySmile.append("circle")
        .attr("cx", 20)
        .attr("cy", -20)
        .attr("r", 4)
        .style("fill", "black");
    //злая улыбка
    angrySmile.append("line")  
        .attr("x1", -20)
        .attr("y1", 30)
        .attr("x2", 0)
        .attr("y2", 15)
        .style("stroke", "black")
        .style("stroke-width", 3);

    angrySmile.append("line")  
        .attr("x1", 0)
        .attr("y1", 15)
        .attr("x2", 20)
        .attr("y2", 30)
        .style("stroke", "black")
        .style("stroke-width", 3);

    //бровь левая
    angrySmile.append("line")
        .attr("x1", -30)
        .attr("y1", -35)
        .attr("x2", -10)
        .attr("y2", -30)
        .style("stroke", "black")
        .style("stroke-width", 4);

    //правая бровь
    angrySmile.append("line")
        .attr("x1", 10)
        .attr("y1", -30)
        .attr("x2", 30)
        .attr("y2", -35)
        .style("stroke", "black")
        .style("stroke-width", 4);

    return angrySmile;
}