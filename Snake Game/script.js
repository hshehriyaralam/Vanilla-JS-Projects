let gameContainer = document.querySelector('.game-container')
let scoreConatiner = document.querySelector('.score-container')
let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let sankeBody = []
let score = 0

function gameOver(){
    headX = 12
    headY = 12
    generateFood()
    velocityX = 0
    velocityY = 0
    sankeBody= []
    score = 0
    scoreConatiner.innerHTML = `Press any (left right up down) key to start`
    alert("Game Over")
}
function generateFood(){
    foodX = Math.floor(Math.random()*25) + 1
    foodY = Math.floor(Math.random()*25) + 1
   for (let i = 0; i <sankeBody.length; i++) {
    if(sankeBody[i][0] == (foodX && foodY)){
        generateFood()
        
    }
     } 
}

// function generateFood() {
//     do {
//         foodX = Math.floor(Math.random() * 25) + 1;
//         foodY = Math.floor(Math.random() * 25) + 1;
//     } while (sankeBody.some(part => part[0] === foodX && part[1] === foodY));
// }


function renderGame(){
    let updateGame = `<div class="food" style="grid-area: ${foodX}/${foodY};"></div>`
    if(headX == foodX && headY == foodY){
       sankeBody.push([headX,headY])
       console.log(sankeBody.length);
       generateFood()
       score += 10
       scoreConatiner.innerHTML = `Score : ${score}`
    }

    sankeBody.pop()
    headX += velocityX
    headY += velocityY
    sankeBody.unshift([headX,headY])



    if(headX == 0 || headY == 0 || headX == 26 || headY == 26){
        gameOver()
    }

    for(let i =1; i<sankeBody.length; i++ ){
        if(sankeBody[0][0] == sankeBody[i][0] && sankeBody[0][1] == sankeBody[i][1]){
            gameOver()
        }
    }
    for (let i = 0; i < sankeBody.length; i++) {
        updateGame += `<div class="snake" style="grid-area: ${sankeBody[i][0]}/${sankeBody[i][1]};"></div>`
    }


    gameContainer.innerHTML = updateGame
    
    
}

generateFood()
setInterval(renderGame, 150)


window.addEventListener('keyup', (e) => {
    let key = e.key
    // console.log(e.key);
    if(key == 'ArrowUp' && velocityX!= 1){
        velocityY = 0
        velocityX = -1
        // console.log('ArrowUp');
    }
     else if(key == 'ArrowDown' && velocityX!= -1){
        velocityX = 1
        velocityY = 0
        // console.log('ArrowDown');
    }
    else if(key == 'ArrowRight' && velocityY != -1 ){
        velocityY = 1
        velocityX = 0
        // console.log('ArrowRight');
    }
    else if(key == 'ArrowLeft' &&  velocityY != 1){
        velocityY = -1
        velocityX = 0
        // console.log('ArrowLeft');
    }

})


