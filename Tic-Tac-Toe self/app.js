let Boxes = document.querySelectorAll('.cell')
let resetBtn = document.getElementById('reset')
let newGame = document.getElementById('newGame')
let msg = document.getElementById('msg')
let msgContainer= document.querySelector('.msg-Container')


let turn0 = true
let count = 0;

// Winning Pattern
let winningPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const enable = () => {
    turn0 = true
    count = 0
    Boxes.forEach((box) => {
        box.classList.remove('disabled')
        box.innerText = ""
    })
}

const disbaled = () => {
    turn0 = true
    count = 0
    Boxes.forEach((box) => {
        box.classList.add('disabled')
    })
}
const gameDraw = () => {
    msgContainer.classList.remove('hide')
    msg.innerText = "Match was a Draw"
    enable()
    resetBtn.classList.add('hide')  
    setTimeout(() => {
        resetBtn.classList.remove('hide')
        msgContainer.classList.add('hide')
        enable()
    },5000)
}

const showWinner = (post1Val) => {
    msgContainer.classList.remove('hide')
    msg.innerText = `Winner is : ${post1Val}`
    resetBtn.classList.add('hide')
    disbaled()
    setTimeout(() => {
        resetBtn.classList.remove('hide')
        msgContainer.classList.add('hide')
        enable()
    },5000)
}

const checkWinner = () => {
   for(let Pattern of winningPattern){
    let post1Val = Boxes[Pattern[0]].innerText
    let post2Val = Boxes[Pattern[1]].innerText
    let post3Val = Boxes[Pattern[2]].innerText


    if(post1Val != "" && post2Val != "" && post3Val ){
        if(post1Val === post2Val && post2Val === post3Val ){
            console.log("winner is", post1Val);
            showWinner(post1Val)
            return true
        }
    }
}
return false;
}

resetBtn.addEventListener('click', () => {
    enable()
})

newGame.addEventListener('click', () => {
    enable()
    msgContainer.classList.add('hide')
    resetBtn.classList.remove('hide')
})

Boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText = "O"
            turn0 = false
        }else{
            box.innerText = "X"
            turn0 = true
        }
        box.classList.add('disabled')
        count++;
         let isWinner = checkWinner()
         if(!isWinner && count === 9){
            gameDraw()
            
         }
        
    })
})