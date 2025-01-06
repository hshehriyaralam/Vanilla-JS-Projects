const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890"
const symbolSet = "~!@#$%^&*()_+/"


// Selectors
let passBox = document.getElementById("pass-box");
let totalChar = document.getElementById("total-char");
let upperInput = document.getElementById("upper-case");
let lowerInput = document.getElementById("lower-case");
let numberInput = document.getElementById("numbers");
let symbolInput = document.getElementById("symbols");

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random () * dataSet.length)]
}



const generatePassword = (password = "") => {
   if(upperInput.checked){
    password += getRandomData(upperSet)
   }
   if(lowerInput.checked){
    password += getRandomData(lowerSet)
   }
   if(numberInput.checked){
    password += getRandomData(numberSet)
   }
   if(symbolInput.checked){
    password += getRandomData(symbolSet)
   }
   if(password.length < totalChar.value){
    return generatePassword(password)
   }
   passBox.innerText = turncateString(password, totalChar.value)   
}
generatePassword()
document.getElementById('btn').addEventListener('click', () => {
    generatePassword()
})

function turncateString(str, num){
    if(str.length > num){
        let subStr = str.substring(0,num)
        return subStr
    }else{
        return str
    }
}