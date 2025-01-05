let gameContainer = document.querySelector('.game-container')
let scoreContainer = document.querySelector('.score-container')
let foodY , foodX ;
let headX= 12, headY = 12;
let velocityX= 0, velocityY = 0;
let sankeBody = []
let score = 0

function generateFood(){
    foodX = Math.floor(Math.random()*25) + 1 
    foodY = Math.floor(Math.random()*25) + 1 
    for(let i = 0; i<sankeBody.length; i++){
        if(sankeBody[i][1] == foodY && sankeBody[i][0] == foodX){
            console.log("food cancell");
            
        }
    } 
}

function gameOver (){
    headX = 12;
    headY = 12;
    generateFood()
    velocityX = 0
    velocityY = 0
    sankeBody = []
    score = 0
    alert ("Game is Over")
    scoreContainer.innerHTML = "Press any (left right up down) key to start"
}

function renderGame(){
    let updateGame = `<div class="food" style="grid-area:${foodX}/${foodY};"></div>`
  if(foodX == headX && foodY == headY){
    sankeBody.push([foodX,foodY])
    console.log(sankeBody.length);
    generateFood() 
    score += 10
    scoreContainer.innerHTML = `Score : ${score}`
    
  }
    sankeBody.pop()
    headY += velocityY
    headX += velocityX
    sankeBody.unshift([headX,headY])
    
  
    if( headX == 0 || headY == 0 || headX == 26 || headY == 26 ){
        gameOver()
    }

    for(let i=1; i<sankeBody.length; i++ ){
        if(sankeBody[0][0] == sankeBody[i][0] && sankeBody[0][1] == sankeBody[i][1]){
            gameOver()
            
        }
    }

    for(let i = 0; i<sankeBody.length; i++){
 updateGame += `<div class="snake" style="grid-area:${sankeBody[i][0]}/${sankeBody[i][1]};"></div>`
    }

    
    gameContainer.innerHTML = updateGame
}

generateFood()
setInterval(renderGame, 150)

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    key = e.key
    // console.log(key);
    
    if(key == "ArrowUp" && velocityX!= 1){
        velocityX = -1
        velocityY = 0
        // console.log("arrowUp");
        
    }else if(key == "ArrowDown" && velocityX!= -1){
        velocityX = 1
        velocityY = 0
        // console.log("arrowDown");

    }else if(key == "ArrowRight" && velocityY != -1){
       velocityY = 1
       velocityX = 0
        // console.log("Arowright");
        
    }else if(key == "ArrowLeft" && velocityY != 1){
        velocityY = -1
        velocityX = 0
        // console.log("Arrowleft");
        
    }
    
    
})