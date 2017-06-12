
window.onload = function(){
  var canvas = document.getElementById("myCanvas");
  window.ctx = canvas.getContext("2d");

  canvas.width = Math.round(window.innerWidth / 20) * 20 - 100;
  canvas.height = Math.round(window.innerHeight / 20) * 20 - 100;
  ctx.fillStyle = "#2386ab";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  snakeStart();
  setInterval(game,1000/15);
}

var width = Math.round(window.innerWidth / 20) * 20 - 100;
var height = Math.round(window.innerHeight / 20) * 20 - 100;
var foodReady = false;
var snakex = 240;
var snakey = 400;
var snake = [[snakex,snakey]];
var food;
var preFood;


function game(){

//placing the food
  function makeFood(){
    var foodx = Math.round(width * Math.random() / 20) * 20 - 20;
    var foody = Math.round(height * Math.random() / 20) * 20 - 20;
    if(foodx < 0) {
      foodx = 0;
    };
    if (foody < 0) {
      foody = 0
    };

    ctx.fillStyle="#13dd13";
    food = ctx.fillRect(foodx,foody,20,20);
    console.log(foodx, foody);
    return [foodx, foody]
  };

//checking if food is present and places new food if false
  console.log("food is here: " + foodReady);
  if(foodReady == false){
    preFood = makeFood();
    foodReady = true;
  };

  //placeholder for when player gets food removes food and makes food presence false
  if(snakex == preFood[0] && snakey == preFood[1]){
    foodReady = false
  };


}


//maping snake start
function snakeStart(){
  console.log(snake);
  for (var i = 1; i < 1; i++) {
    snake.push([(snake[snake.length-1][0] + 20), snakey]);
    ctx.fillStyle="#23cce5";
    ctx.fillRect(snake[i][0],snake[i][1],20,20);
  }
};

//drawing the snake
function draw(){
  snake.push([(snakex), snakey]);
  ctx.fillStyle = "#2386ab";
  ctx.fillRect(snake[snake.length-2][0],snake[snake.length-2][1],20,20)
  ctx.fillStyle="#23cce5";
  ctx.fillRect(snake[snake.length-1][0],snake[snake.length-1][1],20,20);
  console.log(snakex,snakey, snake[1][0]);
}


//listening for button presses and then drawing the new snake
document.addEventListener("keydown",keyPush);
function keyPush(evt) {
  switch(evt.keyCode) {
    case 37:
      snakex = snakex-20;
      console.log('left');
      draw();
      break;
    case 38:
      snakey = snakey-20;
      console.log('up');
      draw();
      break;
    case 39:
      snakex = snakex +20
      console.log('right');
      draw();
      break;
    case 40:
      snakey = snakey +20;
      console.log('down');
      draw();
      break;
  }
}
