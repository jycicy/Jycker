const canvas = document.getElementById('sakuraCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Sakura {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 5 + 4;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.02 - 0.01;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // 花瓣颜色

    // 绘制樱花花瓣形状
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-this.radius, -this.radius, 0, -this.radius * 2);
    ctx.quadraticCurveTo(this.radius, -this.radius, 0, 0);
    ctx.closePath();

    ctx.fill();
    ctx.restore();
  }


  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.rotationSpeed;


    if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
      this.x = Math.random() * canvas.width;
      this.y = -this.radius;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 3 + 1;
    }
  }
}


const sakuraArray = [];
for (let i = 0; i < 100; i++) {
  sakuraArray.push(new Sakura());
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sakuraArray.forEach((sakura) => {
    sakura.update();
    sakura.draw();
  });
  requestAnimationFrame(animate);
}

animate();


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});