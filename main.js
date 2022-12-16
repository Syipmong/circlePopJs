let cnv;
let ctx;
let circleArr;

window.onload = function() {
  cnv = document.getElementById('canvas');
  ctx = cnv.getContext('2d');
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  cnv.style.backgroundColor = 'black';
  cnv.style.position = 'absolute';
  cnv.style.top = '0';
  cnv.style.left = '0';

  circleArr = [];
  for (let i = 0; i < 5; i++) {
    circleArr.push(new Circle(ctx, cnv.width, cnv.height));
  }
  circleArr.forEach(circle => circle.animate());
}


class Circle {
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.rSize = Math.random() * 50;
    this.xVelocity = 2;
    this.yVelocity = 2;
    this.#draw(this.x, this.y, this.rSize);
    this.update();
  }

  #draw(x, y, rSize){
  const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

  this.#ctx.beginPath();
  this.#ctx.arc(this.x, this.y, this.rSize, 0, Math.PI * 2);
  this.#ctx.fillStyle = color;
  this.#ctx.fill();
  this.#ctx.closePath();
}


    update() {
    for (let i = 0; i < circleArr.length; i++) {
      if (circleArr[i] !== this){
        const dx = this.x - circleArr[i].x;
        const dy = this.y - circleArr[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.rSize + circleArr[i].rSize) {
          this.xVelocity = -this.xVelocity;
          this.yVelocity = -this.yVelocity;
        }
      }
    }
    if (this.x + this.rSize > this.#width || this.x - this.rSize < 0) {
      this.xVelocity = -this.xVelocity;
    }
    if (this.y + this.rSize > this.#height || this.y - this.rSize < 0) {
      this.yVelocity = -this.yVelocity;
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }


  animate() {
    this.update();
    this.#draw(this.x, this.y, this.rSize);
    requestAnimationFrame(this.animate.bind(this));
  }
}

