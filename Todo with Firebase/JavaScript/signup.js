window.addEventListener("load", () => {
   if(localStorage.getItem("User")){
      window.location.replace('../Pages/login.html')
   }
})





import { auth, 
   createUserWithEmailAndPassword, 
   setDoc,
   db,
   doc,
 } from "./firebase.js"



const signUpHandler = async () => {
   try{

      let name = document.getElementById('name')
      let email = document.getElementById('email')
      let password = document.getElementById('password')
      //
      
      let response = await createUserWithEmailAndPassword(
         auth,
         email.value,
         password.value
      )
      let obj = {
         name : name.value,
         email:email.value,
         password : password.value
      }
      let uid = response.user.uid
      let userResponse = await setDoc(doc(db,"User", uid),obj)
      alert("Signup Successfully")
      window.location.href = "../Pages/Login.html"
      
    
      // console.log("userResponse",userResponse);
      // console.log("UID", response.user.uid);
   }catch(error){
      alert(error);
      
   }
   
   
}



window.signUpHandler = signUpHandler