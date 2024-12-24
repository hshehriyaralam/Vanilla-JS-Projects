let quetsion = [
    {
        'ques': "What is the correct syntax for referring to an external script called 'app.js'?",
        'a' : "<script src='app.js'>",
        'b' : "<script href='app.js'>",
        'c' :  "<script ref='app.js'>",
        'd' : "<script name='app.js'>",
        'correct' :  "a",
    },
    {
        'ques': "Which JavaScript method is used to write on browser's console?",
        'a' : "browser.log()",
        'b' : "console.write()",
        'c' :  "console.log()",
        'd' : "document.log()",
        'correct' :  "c",
    },
    {
        'ques': "Which of the following is a valid type of function in JavaScript?",
        'a' : "named function",
        'b' : "anonymous function",
        'c' :  "Both A and B",
        'd' : "None of the above",
        'correct' :  "c",
    }
]
let index = 0;
let total = quetsion.length;
let right = 0;
    wrong = 0;
let quesBox = document.getElementById("QuesBox")
let optionInput = document.querySelectorAll(".options")
let loadQuestion = () =>{

    reset();
    let data = quetsion[index];
    quesBox.innerText = ` ${index+1}) ${data.ques}`;
    optionInput[0].nextElementSibling.innerText = data.a;
    optionInput[1].nextElementSibling.innerText = data.b;
    optionInput[2].nextElementSibling.innerText = data.c;
    optionInput[3].nextElementSibling.innerText = data.d;

}

// ************ Submit Function ******************
let submitQuiz = () => {
    let data = quetsion[index];
    let ans = getAnswer()
    if( ans === data.correct){
        right++;
    }
    else{
        wrong++;
    }
    index++;
    loadQuestion()
    return
}
let getAnswer   = () => {
    optionInput.forEach (
        (input) => {
            if (input.checked){
                return input.value
            }
        }
    )
}

// ****************** Reset Form ********************
let reset = () =>{
    optionInput.forEach (
        (input) => {
           input.checked = false;
        }
    )
}








// initial Call
loadQuestion();