const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const windowX = window.innerWidth;
const windowY = window.innerHeight;
canvas.width = windowX;
canvas.height = windowY;

const speedX = 3.4;
const speedY = 3.4;

let click = true;

function draw() {
    drawPlayer()
    canvas.style.backgroundColor = '#000'
}

const drawPlayer = (cx = windowX / 2, cy = windowY / 2) => {
    const playerImg = new Image();
    playerImg.src = 'imagens/ship_D.png';

    playerImg.addEventListener('load', () => ctx.drawImage(playerImg, cx, cy, 50, 50))
}

const shoot = (event) => {
    x = event.offsetX
    y = event.offsetY
    d = Math.sqrt(Math.pow(Math.abs(windowX / 2 - x),2) + Math.pow(Math.abs(windowY / 2 - y),2));
    
    bullet = {
        x : windowX / 2,
        y : windowY / 2,
        xChange : (x - windowX / 2)/(d / speedX),
        yChange : (y - windowY / 2)/(d / speedY),
    }; 
    bullets.push(bullet);
}

function drawBullet(x, y) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

const bullets = [];

function update(i) {
    bullets[i].x += bullets[i].xChange;
    bullets[i].y += bullets[i].yChange;
}

function animate() {
    ctx.clearRect(0, 0, windowX, windowY)

    bullets.forEach((element, i) => {
        drawBullet(element.x, element.y)
        update(i)
    });
    draw()

    requestAnimationFrame(animate);
}

canvas.addEventListener('click', event => {
    shoot(event)

    if (click) {
        animate();
        click = false
    }
})
