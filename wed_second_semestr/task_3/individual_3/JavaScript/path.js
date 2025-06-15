
// создаем массив точек, расположенных буквой "Г"
function createPathG() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")

    let data = [];
    const padding = 100;
    //начальное положение рисунка
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY > padding) {
        data.push( {x: posX, y: posY});
        posY -= h;
    }
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    return data
}

// создаем массив точек, расположенных по кругу
function createPathCircle() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")
    let data = [];
    // используем параметрическую форму описания круга
    // центр расположен в центре svg-элемента, а радиус равен трети высоты/ширины
    for (let t = 0 ; t <= Math.PI * 2; t += 0.05) {
        data.push(
            {x: width / 2 + width / 3 * Math.sin(t),
             y: height / 2 + height / 3 * Math.cos(t)}
        );
    }
    return data
}

function createPathParametric() {
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");
    
    let points = [];
    
    for (let t = 4 * Math.PI - (4 * Math.PI)/5 ; t <= 8 * Math.PI  - (4 * Math.PI)/5; t += 0.05) {

        const x0 = 3 * Math.cos(t) + 2 * Math.cos(1.5 * t);
        const y0 = 3 * Math.sin(t) - 2 * Math.sin(1.5 * t);
        
        //поворот на 30 градусов траектории влево
        const x = width/2 + 40* (x0 * Math.cos(-Math.PI/6) - y0 * Math.sin(-Math.PI/6));
        const y = height/2 + 40* (x0 * Math.sin(-Math.PI/6) + y0 * Math.cos(-Math.PI/6));

        points.push(
            {x: x,
             y: y}
        );
    }
    
    return points;
}

let drawPath =(typePath) => {
	let dataPoints;
    if (typePath == 0) {
        dataPoints = createPathG(); 
    } else if (typePath == 1) {
        dataPoints = createPathCircle(); 
    } else if (typePath == 2) {
        dataPoints = createPathParametric(); 
    }

	const line = d3.line()
		.x((d) => d.x)
		.y((d) => d.y);
    const svg = d3.select("svg")
	// создаем путь на основе массива точек	  
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		.attr('stroke', 'black')
		.attr('fill', 'none');
		
	return path;	
}

function translateAlong(path) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}