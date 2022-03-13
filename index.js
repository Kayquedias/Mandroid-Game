const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const canvas2 = document.querySelector('#canvas2');
const ctx2 = canvas2.getContext('2d');

const windowX = window.innerWidth;
const windowY = window.innerHeight;
canvas.width = windowX;
canvas.height = windowY;
canvas2.width = 50;
canvas2.height = 50;

const speedX = 2;
const speedY = 2;

let isPressed = true;

let playerLocation = {
    x: windowX / 2,
    y: windowY / 2
};

// imagem do jogador principal
let playerImg = new Image();
playerImg.src = 'imagens/ship_D.png';

function draw() {
    canvas.style.backgroundColor = '#000'

    playerImg.addEventListener('load', () => ctx.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50))
}

function rotatePlayer() {
    ctx2.clearRect(0, 0, 50, 50)
    ctx2.translate(25, 25);
    ctx2.rotate(2 * Math.PI / 180);
    ctx2.translate(-25, -25);
    ctx2.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50)
};

const shoot = () => {
    bullet = {
        x : playerLocation.x,
        y : playerLocation.y
    }; 
    bullets.push(bullet);
};

function drawBullet(x, y) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + 25, y, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

const bullets = [];

function update(i, ArrLeft = false, ArrRight = false, ArrUp = false, ArrDown = false) {
    // Velocidade do tiro 
    if (i >= 0) {
        // bullets[i].x += speedX;
        bullets[i].y -= speedY;
    }
    
    // Movimentação do player
    if (ArrLeft) {
        playerLocation.x -= 5;
        ctx.clearRect(0, 0, windowX, windowY)
        ctx.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50)
    } else if (ArrRight) {
        playerLocation.x += 5;
        ctx.clearRect(0, 0, windowX, windowY)
        ctx.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50)
    } else if (ArrUp) {
        playerLocation.y -= 5;
        ctx.clearRect(0, 0, windowX, windowY)
        ctx.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50)
    } else if (ArrDown) {
        playerLocation.y += 5;
        ctx.clearRect(0, 0, windowX, windowY)
        ctx.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50)
    } 
};

function animate() {
    ctx.clearRect(0, 0, windowX, windowY)
    ctx.drawImage(playerImg, playerLocation.x, playerLocation.y, 50, 50)

    bullets.forEach((element, i) => {
        drawBullet(element.x, element.y)
        update(i)
    });

    requestAnimationFrame(animate);
};

window.addEventListener('keydown', (e) => {
    // rotatePlayer()

    if (e.key === ' ') {
        shoot();

        if (isPressed) {
            animate();
            isPressed = false;
        }
    } else if(e.key === 'ArrowLeft') {
        update(undefined, true)
    } else if(e.key === 'ArrowRight') {
        update(undefined, false, true)
    } else if(e.key === 'ArrowUp') {
        update(undefined, false, false, true)
    } else if(e.key === 'ArrowDown') {
        update(undefined, false, false, false, true)
    }
});

draw();