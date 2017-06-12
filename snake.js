
var canvas;
var ctx;


var width = Math.round(window.innerWidth / 20) * 20 - 100;
var height = Math.round(window.innerHeight / 20) * 20 - 100;
var foodReady = false;
var snakex = 240;
var snakey = 400;
var snake = [[snakex,snakey]];
var snakeTail = 1;
var food;
var preFood;


window.onload = function(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = Math.round(window.innerWidth / 20) * 20 - 100;
  canvas.height = Math.round(window.innerHeight / 20) * 20 - 100;

  setInterval(game,1000/15);
}


function game(){
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
  //placeholder for when player gets food removes food and makes food presence false


}
function snakeGrow(){
  if(snakex == preFood[0] && snakey == preFood[1]){
    foodReady = false;
    snake.push([])
    snakeTail++;
  };
}

//maping snake start
/*function snakeStart(){
  console.log(snake);
  for (var i = 1; i < 1; i++) {
    snake.push([(snake[snake.length-1][0] + 20), snakey]);
    ctx.fillStyle="#23cce5";
    ctx.fillRect(snake[i][0],snake[i][1],20,20);
  }
};*/

//drawing the snake
function draw(){

  if(snakex > width) {
    snakex = 0;
  }
  if(snakex < 0){
    snakex = width-20;
  }
  if(snakey > height) {
    snakey = 0;
  }
  if(snakey < 0){
    snakey = height-20;
  }

  snake[0][0] = snakex;
  snake[0][1] = snakey;
  //ctx.fillStyle = "#2386ab";
  //ctx.fillRect(snake[snake.length-2][0],snake[snake.length-2][1],20,20)
  ctx.fillStyle="#23cce5";
  ctx.fillRect(snake[0][0],snake[0][1],20,20);

  if(snakeTail>1){
    for (var i = 1; i < snakeTail; i++) {
      ctx.fillStyle="#23cce5";
      ctx.fillRect(snake[i][0],snake[i][1],20,20);
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
//listening for button presses and then drawing the new snake
document.addEventListener("keydown",keyPush);
function keyPush(evt) {
  switch(evt.keyCode) {
    case 37:
      snakeMemory();
      snakex = snakex-20;
      console.log('left');
      snakeGrow();
      console.log(snake);
      break;
    case 38:
      snakeMemory();
      snakey = snakey-20;
      console.log('up');
      snakeGrow();
      console.log(snake);
      break;
    case 39:
      snakeMemory();
      snakex = snakex +20
      console.log('right');
      snakeGrow();
      console.log(snake);
      break;
    case 40:
      snakeMemory();
      snakey = snakey +20;
      console.log('down');
      snakeGrow();
      console.log(snake);
      break;
  }
}
