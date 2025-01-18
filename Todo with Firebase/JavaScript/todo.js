window.addEventListener('load', () => {
    // console.log("user=>", localStorage.getItem("User"));
    if(!localStorage.getItem("User")){
            window.location.replace('./Login.html')
    }
    
})



import {
    collection,
    addDoc,
    db,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
 } 
    from "./firebase.js";


const showPopUp = (message) => {
    let popUp = document.getElementById('errorPopup')
    let popUpMessage = document.getElementById('popupMessage')
    popUpMessage.textContent = message
    popUp.classList.remove('hide')
}

const closePopup = () => {
    let popUp = document.getElementById('errorPopup')

    popUp.classList.add('hide')
} 


let todoParent = document.getElementById('todoParent')
let todoCollection = collection (db, "Todo Collection")
const addTodo =  async () => {
    try{

        let input = document.getElementById('input')
        // console.log(input.value);
        let obj = {
            value : input.value
        }
        if(!(input.value.trim().length > 0)){
            showPopUp("Input cannot be empty!")
            return
        }else{
            const result =  await addDoc(todoCollection,obj)
            input.value = ""
            getTodo()
            // console.log(result);
        }
      
        
        
    }catch(error){
        alert(error.message);
        
    }
}

const getTodo = async () => {
    try{

        let snapShot = await getDocs(todoCollection)
        let arr = [];
        todoParent.innerHTML = ""
        snapShot.forEach((doc) => {
            const obj = {
                id : doc.id,
                ...doc.data()
            }
            arr.push(obj)
            todoParent.innerHTML += `
            <div class="todo-item">
            <p class="todo-text">${obj.value}</p>
            <div class="todo-actions">
            <button class="edit-btn"  id="${obj.id}"  onclick="editTodo(this)" >EDIT</button>
            <button class="remove-btn" id="${obj.id}"  onclick="deleteTodo(this)">REMOVE</button>
            </div>
            </div>
            `
        });
        
    }catch(e){
        alert(e.message);
        
    }
    
}


const deleteTodo =  async (ele) => {
    try{

        console.log("id", ele.id);
        let id = ele.id
        await deleteDoc(doc(db,"Todo Collection",id))
        getTodo()
        
    }catch(error){
        alert(error.message);
        
    }
}

const editTodo = async (ele) => {
    console.log("edit");
    try{

        let id = ele.id
        let editValue = prompt("enter your Edit values")
        let obj = {
            value : editValue
        }
        await updateDoc(doc(db,"Todo Collection", id ),obj)
        getTodo()
    }catch(error){
        alert(error.message);
        
    }
        
} 

const logOut = () => {
    // console.log("LOgOIt");
    
    localStorage.removeItem('User')
    localStorage.clear()
    window.location.replace('./Login.html')
}


window.addEventListener('DOMContentLoaded',() => (getTodo()))
window.getTodo = getTodo
window.addTodo = addTodo
window.deleteTodo = deleteTodo
window.editTodo = editTodo
window.closePopup = closePopup
window.logOut = logOut
