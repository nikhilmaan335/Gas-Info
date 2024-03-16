let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

function drawTriangle() {

    let ratio = Math.PI / (slider.max - slider.min);
    let angle = ((slider.value - slider.min) * ratio) + Math.PI;
    let radius = 110;
    // first move our cursor to the center of our arcs
    context.translate(180, 200);
    // then rotate the whole context
    context.rotate(angle);
    // move our cursor to our arc's radius
    context.translate(radius, 0);
    // draw the triangle
    context.fillStyle = 'black';
    context.beginPath();
    // this draws the triangle around its center point
    context.lineTo(10, -5);
    context.lineTo(10, 5)
    context.lineTo(-10, 0)
    context.closePath();
    context.fill();
    // place back our context's transfrom to its default
    context.setTransform(1, 0, 0, 1, 0, 0);
}

function drawArcShadow(xPos, yPos, radius, startAngle, endAngle, clockwise, lineColor, fillColor) {
    startAngle = startAngle * (Math.PI / 180);
    endAngle = endAngle * (Math.PI / 180);
    radius = radius;

    context.strokeStyle = lineColor;
    context.fillStyle = fillColor;
    context.lineWidth = 20;
    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, clockwise);
    context.fill();
    context.stroke();
}

function draw() {
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // text
    context.font = "14px Trebuchet MS";
    context.fillStyle = "#aaaaaa";
    // since we don't change the properties, no need to tell the browser to do so
    context.fillText("300", 60, 218);
    context.fillText("850", 280, 218);

    // drawArcShadow   x    y   rad sAng eAng clockwise  line    fill
    drawArcShadow(180, 200, 100, 0, 180, true, "#eeeeee", "white");
    // drawArc   x    y   rad sAng eAng ANTIclockwise  line    fill
    // be careful, 6th argument of arc() is ANTI-clockwise boolean
    // here I changed all start angle to avoid anti-aliasing artifacts + I removed the transparent fill parameter
    drawArc(180, 200, 110, 263, 180, true, "#c1634a", null);
    drawArc(180, 200, 110, 264, 263, true, "#ab5741", null);
    drawArc(180, 200, 110, 288, 264, true, "#e59636", null);
    drawArc(180, 200, 110, 289, 288, true, "#ce8631", null);
    drawArc(180, 200, 110, 302, 289, true, "#e8d932", null);
    drawArc(180, 200, 110, 303, 302, true, "#d0c52d", null);
    drawArc(180, 200, 110, 320, 303, true, "#aecd9c", null);
    drawArc(180, 200, 110, 0, 320, true, "#8db872", null);

    drawTriangle();
}

function drawArc(xPos, yPos, radius, startAngle, endAngle, clockwise, lineColor, fillColor) {
    startAngle = startAngle * (Math.PI / 180);
    endAngle = endAngle * (Math.PI / 180);

    context.strokeStyle = lineColor;
    context.fillStyle = fillColor;
    context.lineWidth = 20;
    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, clockwise);
    // instead of filling transparent, which produces nothing, just don't pass the fillColor parameter and don't call fill().
    fillColor && context.fill();
    context.stroke();
}
slider.oninput = draw;
draw();