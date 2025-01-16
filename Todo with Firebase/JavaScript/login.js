window.addEventListener('load', () => {
    if(localStorage.getItem("User")){
        window.location.replace('../index.html')
    }
})



import { auth,
    signInWithEmailAndPassword
    ,doc,
     setDoc
     ,db } from "./firebase.js"


let loginHandler = async () => {
   try{

       let email = document.getElementById('email')
       let password = document.getElementById('password')
       

        
        let response = await signInWithEmailAndPassword(
        auth, 
        email.value,
        password.value
    )

    let uid = response.user.uid
    alert("login Successfully")
    localStorage.setItem("User",uid)
    window.location.replace("../index.html")
    // console.log("uid",uid);
    // console.log("Response",response);

}catch(e){
    alert(e);
    
}    
    
}



window.loginHandler = loginHandler



