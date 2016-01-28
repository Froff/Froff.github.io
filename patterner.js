//uses math.js

function setupCanvas() {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	ctx.translate(canvas.width/2,canvas.height/2);
	
	start = time = 0;
	requestAnimationFrame(dothing);
}

function starShape(lerp) {
	var t = lerp*4*Math.PI;
	var x = 200 * (Math.cos(t + 0.5*Math.PI) + 0.5*Math.cos(1.5*t + 0.5*Math.PI));
	var y = 200 * (Math.sin(t - 1.5*Math.PI) + 0.5*Math.sin(1.5*t + 1.5*Math.PI));
	return [x, y];
}

function circleShape(lerp) {
	var t = lerp*2*Math.PI;
	var x = 300 * Math.cos(t);
	var y = 300 * Math.sin(t);
	return [x, y];
}

function draw() {
	const STEPS = 500;
	for (i = 0; i < STEPS; i++) {
		var lerp = i/STEPS;
		var lerpN = (lerp+start)%1;
		var position = starShape(lerpN);
		drawCircle (position[0], position[1], Math.pow(5,lerp), "rgb(" + Math.floor(lerp*255) + ", 0, 0)");
		position = circleShape(lerpN);
		drawCircle (position[0], position[1], Math.pow(5,lerp), "rgb(" + Math.floor(lerp*255) + ", 0, 0)");
	}
}

function drawCircle (x, y, rad, color) {
	ctx.beginPath();
	ctx.arc(x, y, rad, 0, 2*Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
}

function dothing () {
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	draw();
	time += 0.01;
	start = time%1;
	requestAnimationFrame(dothing);
}

function rotatePoint(point, angle) {
	var xx = point[0];
	var yy = point[1];
	var R = Math.sqrt(xx*xx + yy*yy);
	var alpha = Math.atan2(xx,yy);
	alpha += angle;
	var x = R*Math.cos(alpha);
	var y = R*Math.sin(alpha);
	return[x, y];
}