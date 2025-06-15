document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function() {
        svg.selectAll('*').remove(); 
    });

    const animateButton = document.getElementById("animateButton");
    animateButton.addEventListener("click", function() {
        const settingForm = document.getElementById("setting");
        runAnimation(settingForm);
    });

})

let runAnimation = (dataForm) => {
    const wayFlag = true;

	const svg = d3.select("svg")
    let pict = drawAngrySmile(svg);
    
    const animateType = document.getElementById("animationType").value;

    const rotate = dataForm.rotate.value;
    const finishR = dataForm.rotate_finish.value;

    const scaleX = dataForm.scaleX.value;
    const scaleY = dataForm.scaleY.value;
    const scaleX_finish = dataForm.scaleX_finish.value;
    const scaleY_finish = dataForm.scaleY_finish.value;

    const time = dataForm.time.value;

    if (wayFlag) {
        const type = document.getElementById("way_type").value;
        let path = drawPath(type);	

        
		pict.transition()
        .ease(d3[animateType]) // установить в зависимости от настроек формы
        .duration(time)
        .attrTween('transform', function() {
            length = path.node().getTotalLength();

            const rotateInterp = d3.interpolateNumber(+rotate, +finishR);
            const scaleInterp = d3.interpolate([scaleX, scaleY], [scaleX_finish, scaleY_finish]);

            return function(t) {
                const r = rotateInterp(t);
                const [sx, sy] = scaleInterp(t);
                const {x, y} = path.node().getPointAtLength(t * length);
                return `translate(${x},${y}) rotate(${r}) scale(${sx},${sy})`;
            }
        });

    } 

}
