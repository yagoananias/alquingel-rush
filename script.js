const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let gameStatus = true;

const rand = function(num) {
  return Math.floor(Math.random() * num);
};

const virus = new Image();
virus.src = "images/virus.png";

const logo = new Image();
logo.src = "images/logo.jpg";

const background = new Image();
background.src = "images/background.jpg";

const alquim = new Image();
alquim.src = "images/alquingel.png";

const player = {
  x: 10,
  y: 300,
  width: 211,
  height: 230,
  xDelta: 0,
  yDelta: 0,
  speed: 10,
  image: alquim,
  draw: function() {
    ctx.drawImage(alquim, this.x, this.y, this.width, this.height);
  },
  update: function() {
    this.x += this.xDelta * this.speed;
    this.y += this.yDelta * this.speed;
  }
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
  event.preventDefault();
  const keyCode = event.keyCode;
  if(keyCode === rightKey)
    player.xDelta = 1;
  else if(keyCode === leftKey)
    player.xDelta = -1;
  else if(keyCode === upKey)
    player.yDelta = -1;
  else if(keyCode === downKey)
    player.yDelta = 1
});

document.addEventListener('keyup', function(event) {
  event.preventDefault();
  const keyCode = event.keyCode;
  if(keyCode === rightKey || keyCode === leftKey) {
    player.xDelta = 0;
  } else if(keyCode === upKey || keyCode === downKey) {
    player.yDelta = 0;
  }
});

const criaVirus = function(count, canvasWidth, canvasHeight) {

  let arr = [];
  const w = 100;
  const h = 115;
  for(let i=0; i<count; i++) {

    let obj = {
      x: rand(canvas.width-w),
      y: rand(canvas.height-h),
      width: w,
      height: h,
      xDelta: (Math.random()-0.5)*20,
      yDelta: (Math.random()-0.5)*20,
      image: virus,

      draw: function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      },
      update: function() {
        if(player.x < this.x + this.width && player.x + player.width > this.x+50 &&
          player.y < this.y + this.height && player.y + player.height > this.y+50) {
            gameStatus = false;
          }

          this.x+=this.xDelta;
          this.y+=this.yDelta;
          if(this.x+this.width>=canvas.width) {
            this.xDelta=(Math.random()*15)*-1;
          }
          if(this.y+this.height>=canvas.height) {
            this.yDelta=(Math.random()*15)*-1;
          }
          if(this.x<=0) {
            this.xDelta=(Math.random()*15);
          }
          if(this.y<=0) {
            this.yDelta=(Math.random()*15);
          }
      }
    };
    arr[i]=obj;
  }
  return arr;
};

let array = criaVirus(1, canvas.width, canvas.height);

const draw = function() {

  ctx.drawImage(background,0,0,canvas.width,canvas.height);
  ctx.drawImage(logo,(canvas.width/2)-110.5,10,221, 170);

  player.draw();

  for(let i=0; i<array.length; i++) {
    array[i].draw();
  }
};

const update = function() {
  player.update();

  for(let i=0; i<array.length; i++) {
    array[i].update();
    if(this.x>=canvas.width) {
      this.xDelta=this.xDelta*-1;
    }
    if(this.y>=canvas.height) {
      this.yDelta=this.yDelta*-1;
    }
  }
};

const loop = function() {
  if(gameStatus) {
    requestAnimationFrame(loop);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    update();
  } else {
    alert("Você foi infectado :(");
  }
};

