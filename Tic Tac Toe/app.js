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

const gameDraw = () => {
    msg.innerText = "Game was a Draw"
    msgContainer.classList.remove('hide')
    Boxes.forEach((box) => {
        box.classList.remove('disabled')
        box.innerText = "";
    })
    resetBtn.classList.add('hide')
    setTimeout(() => {
        turn0 = true;
        count = 0
        Boxes.forEach((box) => {
            box.classList.remove('disabled')
            box.innerText = ""
        })
        msgContainer.classList.add('hide')
    },5000)
    

}

const NewGame = () => {
    turn0 = true;
    count = 0
    Boxes.forEach((box) => {
        box.classList.remove('disabled')
        box.innerText = "";
    })
    msgContainer.classList.add('hide')
    resetBtn.classList.remove('hide')

}

 const  resetGame = () => {
    turn0 = true;
    count = 0
    Boxes.forEach((box) => {
        box.classList.remove('disabled')
        box.innerText = ""
    })
    msgContainer.classList.add('hide')
 }
const showWinner = (post1Val) => {
    msgContainer.classList.remove('hide')
    msg.innerText = `Winner is: ${post1Val} `
    resetBtn.classList.add('hide')
    Boxes.forEach((box) => {
        box.classList.add('disabled')
    })
    setTimeout(() => {
        turn0 = true;
        count = 0
        Boxes.forEach((box) => {
            box.classList.remove('disabled')
            box.innerText = ""
        })
        msgContainer.classList.add('hide')
    },5000)
    
}
resetBtn.addEventListener('click', () =>  resetGame() )
newGame.addEventListener('click', () => NewGame())

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let post1Val = Boxes[pattern[0]].innerText;
        let post2Val = Boxes[pattern[1]].innerText;
        let post3Val = Boxes[pattern[2]].innerText;

        if (post1Val !== "" && post2Val !== "" && post3Val !== "") {
            if (post1Val === post2Val && post2Val === post3Val) {
                console.log(`Winner is ${post1Val}`);
                showWinner(post1Val);
                return true; // Winner found, return true
            }
        }
    }
    return false; // No winner, return false
};

Boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText !== "") return; // Prevent overwriting already filled boxes

        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.classList.add('disabled');
        count++;

        let isWinner = checkWinner();

        if (!isWinner && count === 9) {
            gameDraw(); // Only call if there is no winner and count is 9
        }
    });
});

