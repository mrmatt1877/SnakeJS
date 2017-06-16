
var canvas;
var ctx;

var width = Math.round(window.innerWidth / 40) * 20 - 100;
var height = Math.round(window.innerHeight / 40) * 20 - 100;
var foodReady = false;
var snakex = 240;
var snakey = 400;
var snake = [[snakex,snakey]];
var snakeTail = 1;
var food;
var preFood;
var direction;
var preDirection;
var score;


window.onload = function(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = Math.round(window.innerWidth / 40) * 20 - 100;
  canvas.height = Math.round(window.innerHeight / 40) * 20 - 100;

  score = document.getElementById("score")

  setInterval(game,1000/15);
}


function game(){
  score.innerHTML = "Score: " + snakeTail;
  //draw the board and then the snake each time
  ctx.fillStyle = "#2386ab";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  draw();


//generating random food placement
  function makeFood(){
    var foodx = Math.round(width * Math.random() / 20) * 20 - 20;
    var foody = Math.round(height * Math.random() / 20) * 20 - 20;
    if(foodx < 0) {
      foodx = 0;
    };
    if (foody < 0) {
      foody = 0
    };

    return [foodx, foody]
  };

//checking if food is present and places new food if false
  //console.log("food is here: " + foodReady, preFood );
  if(foodReady == false){
    preFood = makeFood();
    foodReady = true;
  };

  ctx.fillStyle="#13dd13";
  food = ctx.fillRect(preFood[0],preFood[1],20,20);

  //snake movement
  switch (direction) {
    case "left":
      preDirection = direction;
      snakex = snakex-20;
      break;
    case "up":
      preDirection = direction;
      snakey = snakey-20;
      break;
    case "right":
      preDirection = direction;
      snakex = snakex+20;
      break;
    case "down":
      preDirection = direction;
      snakey = snakey+20;
      break;
    default:
  }

  snakeMemory();
  snakeGrow();
  ouroboros();

}

//placeholder for when player gets food removes food and makes food presence false
function snakeGrow(){
  if(snakex == preFood[0] && snakey == preFood[1]){
    foodReady = false;
    snake.push([])
    snakeTail++;
  };
}

//drawing the snake
function draw(){

  if(snakex > width - 20) {
    snakex = 0;
  }
  if(snakex < 0){
    snakex = width-20;
  }
  if(snakey > height - 20) {
    snakey = 0;
  }
  if(snakey < 0){
    snakey = height-20;
  }

  snake[0][0] = snakex;
  snake[0][1] = snakey;

  ctx.fillStyle="#23cce5";
  ctx.fillRect(snake[0][0],snake[0][1],19,19);

  if(snakeTail>1){
    for (var i = 1; i < snakeTail; i++) {
      ctx.fillStyle="#23cce5";
      ctx.fillRect(snake[i][0],snake[i][1],19,19);
    }
  }
}

function ouroboros() {
  for (var i = 1; i < snake.length; i++) {
    if( snakex == snake[i][0] && snakey == snake[i][1]){
      snake = [snake.shift()];
      snakeTail = 1;
    }
  }
}

//keeping track of previous moves
function snakeMemory(){
  if(snakeTail>1){
    for (var i = 1; i < snakeTail; i++) {
      snake[snake.length - i][0] = snake[(snake.length-i)-1][0];
      snake[snake.length - i][1] = snake[(snake.length-i)-1][1];
    }
  }
}
//listening for button presses
document.addEventListener("keydown",keyPush);
function keyPush(evt) {
  switch(evt.keyCode) {
    case 37:
      if (preDirection != "right") {
        direction = "left"
      }
      console.log('left');
      break;
    case 38:
      if (preDirection != "down") {
        direction = "up"
      }
      console.log('up');
      break;
    case 39:
      if (preDirection != "left") {
        direction = "right"
      }
      console.log('right');
      break;
    case 40:
      if (preDirection != "up") {
        direction = "down"
      }
      console.log('down');
      break;
  }
}
