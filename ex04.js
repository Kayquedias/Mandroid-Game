const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let px = 0;
let py = 0;

function draw() {
    player()
}

function player() {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
    ctx.lineWidth = '10'
    ctx.fillStyle = '#000000'
    ctx.stroke()
}

// const projectile = () => {
//     ctx.beginPath()
//     ctx.arc(px, py, 8, 0, Math.PI * 2)
//     ctx.fillStyle = '#ff0000'
//     ctx.closePath()
//     ctx.fill()
// }

const projectiles = [];

// const projectile = {
//     x: centerX + px,
//     y: centerY + py,
//     rad: 6
// }

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    projectiles.forEach(project => {
        drawProjectile(px, py, 6)
        update()
    });
        
    player()
    requestAnimationFrame(animate)
}
    
function update(velx, vely) {
    px = px + 1;
    py = py + 1; 
}

function drawProjectile(x, y, rad) {
    ctx.beginPath()
    ctx.arc(x, y, rad, 0, Math.PI * 2)
    ctx.fillStyle = '#00ff00'
    ctx.fill();
}

draw();



document.addEventListener('click', (e) => { 
    const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2) 
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        velocity
    )
    animate()
})

// = 0 