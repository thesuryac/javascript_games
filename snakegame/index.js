var blocksize = 25;
var rows = 30;
var cols = 30;
var board;
var context;


var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var  snakebody = [];

var foodX;
var foodY;

var foodpX;
var foodpY;

let goodfood = true;

var gameover = false;
var velocityX = 0;
var velocityY = 0;
var countScore = 0;
var score;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");
    placefood()
    document.addEventListener("keyup",changeDirection);

    setInterval(update,100);

}



function update(){
    if(gameover){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);


    context.fillStyle = "orangered";
    context.fillRect(foodX,foodY,blocksize,blocksize)

    context.fillStyle = "purle";
    context.fillRect(foodpX,foodpY,blocksize,blocksize)

    if(snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX,foodY]);
        countScore++;
        placefood()

        
    }
 
    score = document.getElementById("number");
    score.innerHTML=`
    ${countScore}`;

    for(let i = snakebody.length-1;i>0;i--){
        snakebody[i] = snakebody[i-1];
    }
    if (snakebody.length){
        snakebody[0]= [ snakeX, snakeY]
    }
    context.fillStyle = "lime";
    snakeX +=  velocityX*blocksize;
    snakeY += velocityY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i=0;i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }

    if(snakeX<0 || snakeX >=(cols*blocksize)-1||snakeY<0|| snakeY >rows*blocksize-1){
        gameover = true;
        var game = document.getElementById("game")
        game.style.display = "block";
        
    }
    for(let i=0; i<snakebody.length;i++){
        if(snakeX == snakebody[i][0]&& snakeY==snakebody[i][1]){
            gameover = true;
            var game = document.getElementById("game")
            game.style.display = "block";
        }
    }
}





function placefood(){
    foodX = Math.floor(Math.random()*cols)*blocksize;
    foodY = Math.floor(Math.random()*rows)*blocksize;
  
}
function placefoodp(){
    foodpX = Math.floor(Math.random()*cols)*blocksize;
    foodpY = Math.floor(Math.random()*rows)*blocksize;
}
function changeDirection(e){
     if(e.code == "ArrowUp" && velocityY !=1){
        velocityX= 0;
        velocityY = -1;
     }
     else if(e.code == "ArrowDown"&&velocityY!=-1){
        velocityX= 0;
        velocityY = 1;
     }
     else if(e.code == "ArrowLeft" && velocityX!=1){
        velocityX= -1;
        velocityY = 0;
     } 
     else if(e.code == "ArrowRight"&& velocityX!=-1){
        velocityX= 1;
        velocityY = 0;
     }
}

