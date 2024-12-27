// regular expression for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

// -------------------------------------------------- //


// all variables 
let countryList = document.getElementById('country-list');
let cityList = document.getElementById('city-list');
let fullscreenDiv = document.getElementById('fullscreen-div')
let modal = document.getElementById('modal')
let addBtn = document.getElementById('add-btn')
let closeBtn = document.getElementById('close-btn')
let modalBtns = document.getElementById('modal-btns')
let form = document.getElementById('modal')
let addrBookList = document.querySelector('#addr-book-list tbody')



let addrName = firstName = lastName = email = phone = streetAddr = city = postalCode = country = labels = "";




// Class Address
class Address{

    constructor(id, addrName,firstName, lastName, email, phone, streetAddr, city, postalCode, country,labels ){
        this.id = id;
        this.addrName = addrName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.streetAddr = streetAddr;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.labels = labels
    }
     // Add Address
     static addAddress(address){
        let addresses = Address.getAddresses();
        addresses.push(address)
        localStorage.setItem('addresses',JSON.stringify(addresses));
        
          
          
      }
      static getAddresses(){
          // from  local storage 
          let addresses;
          if(localStorage.getItem('addresses') === null){
              addresses = [];
          }else{
              addresses = JSON.parse(localStorage.getItem('addresses'));
          }
          return addresses;
      };


      // delete Address 
      static deleteAddress(id){
        let addresses = Address.getAddresses()
        addresses.forEach((address, index) => {
            if(address.id == id){
                addresses.splice(index,1)
            }
        })
        localStorage.setItem('addresses',JSON.stringify(addresses));
        form.reset();
        UI.closeModal();
        addrBookList.innerHTML = ""
        UI.showAddrestList()
      }

      //update Address
      static updateAddress(item){
        let addresses = Address.getAddresses()
        addresses.forEach(address => {
            if(address.id == item.id){
                address.addrName = item.addrName;
                address.firstName = item.firstName;
                address.lastName = item.lastName;
                address.email = item.email;
                address.phone = item.phone;
                address.streetAddr = address.streetAddr;
                address.city = item.city;
                address.postalCode = item.postalCode;
                address.country = item.country;
                address.labels = item.labels;
            }
        })
        localStorage.setItem('addresses',JSON.stringify(addresses))
        addrBookList.innerHTML = "";
        UI.showAddrestList()
      }
}

//  Class UI 
class UI{

    static showAddrestList(){
        let addresses =  Address.getAddresses()
        addresses.forEach(address => UI.addToaddressList(address)
        
    )
    
        
    }
    static addToaddressList(address){
        let tableRow = document.createElement('tr')
        tableRow.setAttribute('data-id',address.id )
        tableRow.innerHTML += `
                               <td>${address.id}</td>
                                <td>
                                    <span class = "addressing-name">${address.addrName}</span><br><span class = "address">${address.streetAddr} ${address.postalCode} ${address.city} ${address.country} </span>
                                </td>
                                <td><span>${address.labels}</span></td>
                                <td>${address.firstName + " " + address.lastName}</td>
                                <td>${address.phone}</td> `

     addrBookList.appendChild(tableRow)
    }

     static showModalData(viewId){
        let addresses = Address.getAddresses()
        addresses.forEach(address => {
            if(address.id == viewId ){
               form.addr_ing_name.value = address.addrName;
               form.first_name.value = address.firstName;
               form.last_name.value = address.lastName;
               form.email.value = address.email;
               form.phone.value = address.phone;
               form.street_addr.value = address.streetAddr;
               form.city.value = address.city;
               form.postal_code.value = address.postalCode;
               form.country.value = address.country;
               form.labels.value = address.labels;
              
               document.getElementById('modal-title').innerHTML = "Change your Address"
              
              document.getElementById('modal-btns').innerHTML = `
                   <button type="submit" id="update-btn"   data-id="${viewId}">Update</button>
                   <button type="submit" id="delete-btn" data-id="${viewId}">Delete</button>
              `
               UI.showModal()
               
            }
        })
     }
    static showModal(){
        modal.style.display = "block";
        fullscreenDiv.style.display = "block"
    }

    static closeModal(){
        modal.style.display = "none";
        fullscreenDiv.style.display = "none"
        
    }
}


// Dom Content Loaded 
window.addEventListener('DOMContentLoaded', () => {
    LoadJson();
    CityLoad();
    eventListener();
    UI.showAddrestList();
})

//eventListener
function eventListener(){
       // show add item modal 
       addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('modal-title').innerHTML = "Add Address"
        UI.showModal();
        document.getElementById('modal-btns').innerHTML = 
        `<button type="submit" id="save-btn">Save</button>`
    })

    closeBtn.addEventListener('click', () =>  UI.closeModal())

    modalBtns.addEventListener('click', (event) => {
            event.preventDefault();
        if(event.target.id === 'save-btn'){        
            let isFormValid  = getFormData()
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input => {
                    setTimeout(() => {
                        input.classList.remove('errorMsg')
                    },1500)
                })
            }else{
                let allItem = Address.getAddresses();
                let lastItemId = (allItem.length > 0) ? allItem[allItem.length - 1].id : 0;
                lastItemId++;


                const addressItem = new Address(lastItemId,addrName,firstName, lastName, email, phone, streetAddr, city, postalCode, country,labels)
                Address.addAddress(addressItem)
                UI.closeModal()
                UI.addToaddressList(addressItem)
                form.reset()
            }}
    })

    addrBookList.addEventListener('click', (event) => {
        let trElement;
        if(event.target.parentElement.tagName === 'TD'){
            trElement = event.target.parentElement.parentElement;
        }
        if(event.target.parentElement.tagName === 'TR'){
            trElement =  event.target.parentElement;
        }
        let viewId  = trElement.dataset.id 
        UI.showModalData(viewId)
        
        

        // delete address
        modalBtns.addEventListener('click', (event) => {
            if(event.target.id === 'delete-btn'){
                Address.deleteAddress(event.target.dataset.id)
            }
        })
    })

     // Update Address
     modalBtns.addEventListener('click',(event) => {
        event.preventDefault()
        if(event.target.id == 'update-btn'){
            let id = event.target.dataset.id;
            let isFormValid = getFormData()
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input => {
                    setTimeout(() => {
                        input.classList.remove('errorMsg')
                    },1500)
                })
            }else{
                // let allItem = Address.getAddresses();
                // let lastItemId = (allItem.length > 0) ? allItem[allItem.length - 1].id : 0;
                // lastItemId++;

                const addressItem = new Address(id,addrName,firstName, lastName, email, phone, streetAddr, city, postalCode, country,labels)
                Address.updateAddress(addressItem)
                UI.closeModal()
                form.reset()
            }
           
     }
    }
    )




}

// Load JSON
function LoadJson(){
    fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        let html = ""
        data?.forEach((country) => {
            html += `
            <option>${country.country}</option>
            `
        })
        countryList.innerHTML = html
    })
}

// CityLoad
function CityLoad(){
    fetch('cities.json')
    .then(response => response.json())
    .then((data) => {
        let html = ""
        data?.forEach((city) => {
            html += `
            <option>${city.city}</option>
            `
        });
        cityList.innerHTML = html;
    })
}


// getFormData 
function getFormData(){
    let inputValidStatus = []

    // mail Regex
    if(!strRegex.test(form.addr_ing_name.value) || form.addr_ing_name.value.trim().length === 0){
       addErrMSg(form.addr_ing_name);
       inputValidStatus[0] = false;
    }else{
        addrName = form.addr_ing_name.value
        inputValidStatus[0] = true;
    }

    // FirstName Regex 
    if(!strRegex.test(form.first_name.value) || form.first_name.value.trim().length === 0){
        addErrMSg(form.first_name);
        inputValidStatus[1] = false;
     }else{
         firstName = form.first_name.value
         inputValidStatus[1] = true;
     }

      // LastName Regex 
    if(!strRegex.test(form.last_name.value) || form.last_name.value.trim().length === 0){
        addErrMSg(form.last_name);
        inputValidStatus[2] = false;
     }else{
         lastName = form.last_name.value
         inputValidStatus[2] = true;
     }

     // email
    if(!emailRegex.test(form.email.value)){
        addErrMSg(form.email);
        inputValidStatus[3] = false;
     }else{
         email = form.email.value
         inputValidStatus[3] = true;
     }
    
       // phone
    if(!phoneRegex.test(form.phone.value)){
        addErrMSg(form.phone);
        inputValidStatus[3] = false;
     }else{
         phone = form.phone.value
         inputValidStatus[3] = true;
     }

          // Street Addressed
    if(!(form.street_addr.value.trim().length > 0)){
        addErrMSg(form.street_addr);
        inputValidStatus[4] = false;
     }else{
         streetAddr = form.street_addr.value
         inputValidStatus[4] = true;
     }

      // Postal Code 
    if(!digitRegex.test(form.postal_code.value)){
        addErrMSg(form.postal_code);
        inputValidStatus[5] = false;
     }else{
         postalCode = form.postal_code.value
         inputValidStatus[5] = true;
     }
     city = form.city.value 
     country = form.country.value;
     labels = form.labels.value;
    //   console.log(addrName, firstName , lastName , email , phone , streetAddr , city , postalCode , country , labels);

      return inputValidStatus.includes(false) ? false : true ;
}


function addErrMSg(inputBox){
    inputBox.classList.add('errorMsg')
}