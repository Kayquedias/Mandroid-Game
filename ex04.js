const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const windowX = window.innerWidth;
const windowY = window.innerHeight;
canvas.width = windowX;
canvas.height = windowY;

let shotX = 5;
let shotY = 5;

function draw() {
    drawCircle()
}

const drawCircle = (cx = windowX / 2, cy = windowY / 2) => {
    ctx.strokeStyle = '#ff0a00'; // color used to draw at the paint

    ctx.beginPath();
    ctx.arc(cx, cy, 50, 30, 0, Math.PI * 2);
    ctx.closePath()
    ctx.stroke()
}

const shoot = (event) => {
    x = event.offsetX
    y = event.offsetY
    d = Math.sqrt(Math.pow(Math.abs(windowX / 2 - x),2) + Math.pow(Math.abs(windowY / 2 - y),2));
    
    bullet = {
        x : windowX / 2,
        y : windowY / 2,
        xChange : (x - windowX / 2)/(d / shotX),
        yChange : (y - windowY / 2)/(d / shotY),
    }; 
    bullets.push(bullet);
}

const bullets = [];

function update() {
    ctx.clearRect(0, 0, windowX, windowY)
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].xChange;
        bullets[i].y += bullets[i].yChange;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(bullets[i].x, bullets[i].y, 5, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
}

canvas.addEventListener('click', event => {
    animate();

    function animate() {
        ctx.clearRect(0, 0, windowX, windowY)
        draw()
        shoot(event)
        update()

        requestAnimationFrame(animate);
    }
})