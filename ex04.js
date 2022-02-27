const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const windowX = window.innerWidth;
const windowY = window.innerHeight;
canvas.width = windowX;
canvas.height = windowY;

const speedX = 5;
const speedY = 5;

function draw() {
    drawCircle()
}

const drawCircle = (cx = windowX / 2, cy = windowY / 2) => {
    ctx.strokeStyle = '#ff0a00'; // color used to draw at the paint

    ctx.beginPath();
    ctx.arc(cx, cy, 50, 30, 0, Math.PI * 2);
    ctx.stroke()
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
    // bullets.forEach((element, i) => {
    //     drawBullet(element.x, element.y)
    //     element.x += element.xChange;
    //     element.y += element.yChange;

        // ctx.fillStyle = '#000';
        // ctx.beginPath();
        // ctx.arc(element.x, element.y, 3, 0, Math.PI * 2);
        // ctx.closePath();
        // ctx.fill();
    // });
    bullets[i].x += bullets[i].xChange;
    bullets[i].y += bullets[i].yChange;
    
    // for (let i = 0; i < bullets.length; i++) {
    //     bullets[i].x += bullets[i].xChange;
    //     bullets[i].y += bullets[i].yChange;

    //     ctx.fillStyle = '#000';
    //     ctx.beginPath();
    //     ctx.arc(bullets[i].x, bullets[i].y, 3, 0, Math.PI * 2)
    //     ctx.fill()
    // }
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

const click = () => {
    setInterval(() => console.table(bullets.forEach((e, i) => console.log(i))), 5000)
}

canvas.addEventListener('click', event => {
    shoot(event)
    animate();   

    click()
})
