document.addEventListener("DOMContentLoaded", function() { 
    showTable('build', buildings); 

    const toggleBtn = document.getElementById('toggleTable');
    const table = document.getElementById('build');
    
    toggleBtn.addEventListener('click', function() {
        if (this.textContent === 'Скрыть таблицу') {
            // Удаляем все строки таблицы кроме заголовка
            d3.select("#build").selectAll("tr").remove();
            this.textContent = 'Показать таблицу';
        } else {
            showTable('build', buildings);
            this.textContent = 'Скрыть таблицу';
        }
    });

    drawGraph(buildings, "Страна", "max"); 
    //обработчик для кнопки обновления графика
    document.getElementById('updateGraph').addEventListener('click', function() {
        // Получаем значение для оси OX
        const key = document.querySelector('input[name="x-axis"]:checked').value;
        const type=document.getElementById('chartType').value;
        
        // Определяем режим отображения
        let mode;
        const showMin = document.getElementById('y-min').checked;
        const showMax = document.getElementById('y-max').checked;

        if (!showMax && !showMin){
            alert("Не выбраны значения по оси ОY!");
            return;
        }
        
        if (showMin && showMax) {
            mode = 'both';
        } else if (showMin) {
            mode = 'min';
        } else if (showMax) {
            mode = 'max';
        } else {
            mode = 'both'; // по умолчанию, если ничего не выбрано
        }
        
        drawGraph(buildings, key, mode,type);
    });
})