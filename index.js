const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const windowX = window.innerWidth;
const windowY = window.innerHeight;
canvas.width = windowX;
canvas.height = windowY;

const speedX = 3.4;
const speedY = 3.4;

let click = true;

// imagem do jogador principal
let playerImg = new Image();
playerImg.src = 'imagens/ship_D.png';

function draw() {
    canvas.style.backgroundColor = '#000'

    playerImg.addEventListener('load', () => ctx.drawImage(playerImg, windowX / 2 - 25, windowY / 2, 50, 50))
}

const shoot = () => {
    bullet = {
        x : windowX / 2,
        y : windowY / 2,
    }; 
    bullets.push(bullet);
}

function drawBullet(x, y) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

const bullets = [];

function update(i) {
    bullets[i].y -= speedY;
    // bullets[i].y += bullets[i].yChange;
}

function animate() {
    ctx.clearRect(0, 0, windowX, windowY)

    bullets.forEach((element, i) => {
        drawBullet(element.x, element.y)
        update(i)
    });

    ctx.drawImage(playerImg, windowX / 2 - 25, windowY / 2, 50, 50)

    requestAnimationFrame(animate);
}

canvas.addEventListener('click', () => {
    shoot()

    if (click) {
        animate();
        click = false
    }
})

draw()