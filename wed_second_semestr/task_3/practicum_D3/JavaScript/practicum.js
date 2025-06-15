document.addEventListener('DOMContentLoaded', function() {

  d3.select("input[value='Изменить страницу']").on("click", function() {
    d3.selectAll(".menu").size() < 2 ?   //проверка чтобы создавать 1 раз
      d3.select("body")
        .insert("div", "h2")
        .attr("class", "menu")
        .selectAll("a")                  
        .data(d3.selectAll(".content a").nodes())
        .enter()
        .append("a")
        .attr("href", "#")
        .text(d => d3.select(d).text()) :
      null;
  });

});