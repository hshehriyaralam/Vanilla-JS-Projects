const birthdayInput = document.getElementById('birthday-input')
let endDate = birthdayInput
let birthdayHeading = document.getElementById('end-date')
let NameInput = document.getElementById('name-input')
let userName = document.getElementById('user-name')
let startCountDown = document.querySelector('#start-timer')
let Days = document.getElementById('days')
let hours = document.getElementById('hours')
let minutes = document.getElementById('minutes')
let seconds = document.getElementById('seconds')


// Clock Function
function clock(){
    const end = new Date(endDate.value)
    const now = new Date()
    const diff = (end - now) / 1000 ;

    // if(diff < 0) return ;

    // Convert into Days 
     Days.innerHTML = Math.floor(diff / 3600 / 24)    
     hours.innerHTML = Math.floor(diff / 3600) % 24
     minutes.innerHTML = Math.floor(diff / 60) % 60
     seconds.innerHTML = Math.floor(diff) % 60    
}


startCountDown.addEventListener('click',() => {

    userName.innerHTML = `Hello ${NameInput.value}`
    birthdayHeading.innerHTML = endDate.value
    // console.log("endDate",endDate.value);
    // clock()
    
    
    setInterval(clock,1000)
    
})