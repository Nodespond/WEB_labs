document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    const drawButton = document.getElementById("drawButton");
    drawButton.addEventListener("click", function() {
        const settingForm = document.getElementById("setting");
        draw(settingForm); // Вызываем функцию draw, передавая форму
    });

    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function() {
        svg.selectAll('*').remove(); 
    });

    const animateButton = document.getElementById("animateButton");
    animateButton.addEventListener("click", function() {
        const settingForm = document.getElementById("setting");
        runAnimation(settingForm);
    });

    document.getElementById('enableAnimation').addEventListener('change', function() {
        const animationControls = document.getElementById('animation-controls');
        const animationList = document.getElementById('animationType');
        const animeDrawButt = document.getElementById('drawButton');
        const animateWay = document.getElementById('wayAnimate');

        const coordForX = document.getElementById('cx_for');
        const xInputC = document.getElementById('cx_finish');
        const coordForY = document.getElementById('cy_for');
        const yInputC = document.getElementById('cy_finish');

        const scaleForX = document.getElementById('scaleX_for');
        const xInputS = document.getElementById('scaleX_finish');
        const scaleForY = document.getElementById('scaleY_for');
        const yInputS = document.getElementById('scaleY_finish');

        const rotateFor = document.getElementById('rotate_for');
        const inputR = document.getElementById('rotate_finish');

        animationControls.style.display = this.checked ? 'block' : 'none';
        animationList.style.display = this.checked ? 'flex' : 'none';
        animeDrawButt.style.display = this.checked ? 'none' : '';
        animateWay.style.display = this.checked ? 'block' : 'none';

        styleHidd = "style.display = this.checked ? '' : 'none' ";

        coordForX.style.display = this.checked ? '' : 'none' ;
        coordForY.style.display = this.checked ? '' : 'none' ;
        xInputC.style.display = this.checked ? '' : 'none' ;
        yInputC.style.display = this.checked ? '' : 'none' ;

        scaleForX.style.display = this.checked ? '' : 'none' ;
        scaleForY.style.display = this.checked ? '' : 'none' ;
        xInputS.style.display = this.checked ? '' : 'none' ;
        yInputS.style.display = this.checked ? '' : 'none' ;

        rotateFor.style.display = this.checked ? '' : 'none' ;
        inputR.style.display = this.checked ? '' : 'none' ;
    });

    document.getElementById('goFromWay').addEventListener('change', function() {
        const coordAnimate = document.getElementById('coordAnimate');
        const wayType = document.getElementById('wayTypes');
        
        coordAnimate.style.display = this.checked ? 'none' : 'block';
        wayType.style.display = this.checked ? 'block' : 'none';
    });

})

let draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg)

    const x = dataForm.cx.value;
    const y = dataForm.cy.value;

    const rotate = dataForm.rotate.value;

    const scaleX = dataForm.scaleX.value;
    const scaleY = dataForm.scaleY.value;


    const transformString = `translate(${x}, ${y}) rotate(${rotate}) scale(${scaleX}, ${scaleY})`;

    pict.attr("transform", transformString);
}

let runAnimation = (dataForm) => {
    const wayFlag = document.getElementById("goFromWay").checked;

	const svg = d3.select("svg")
    let pict = drawSmile(svg);
    
    const animateType = document.getElementById("animationType").value;

    const x = dataForm.cx.value;
    const y = dataForm.cy.value;
    const finishX = dataForm.cx_finish.value;
    const finishY = dataForm.cy_finish.value;

    const rotate = dataForm.rotate.value;
    const finishR = dataForm.rotate_finish.value;

    const scaleX = dataForm.scaleX.value;
    const scaleY = dataForm.scaleY.value;
    const scaleX_finish = dataForm.scaleX_finish.value;
    const scaleY_finish = dataForm.scaleY_finish.value;

    const transformStart = `translate(${x}, ${y}) rotate(${rotate}) scale(${scaleX}, ${scaleY})`;
    const transformEnd = `translate(${finishX}, ${finishY}) rotate(${finishR}) scale(${scaleX_finish}, ${scaleY_finish})`;

    if (wayFlag) {
        const type = document.getElementById("way_type").value;
        let path = drawPath(type);	
		pict.transition()
        .ease(d3[animateType]) // установить в зависимости от настроек формы
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
    } else {
        pict.attr("transform", transformStart)
        .transition()
        .duration(3000)
        .ease(d3[animateType])
        .attrTween("transform", function() {
            //интерполяторы для каждого параметра
            const translateInterp = d3.interpolate([x, y], [finishX, finishY]);
            const rotateInterp = d3.interpolateNumber(+rotate, +finishR);
            const scaleInterp = d3.interpolate([scaleX, scaleY], [scaleX_finish, scaleY_finish]);
            
            return function(t) {
                const [tx, ty] = translateInterp(t);
                const r = rotateInterp(t);
                const [sx, sy] = scaleInterp(t);
                return `translate(${tx},${ty}) rotate(${r}) scale(${sx},${sy})`;
            };
        });
    }

    
}
