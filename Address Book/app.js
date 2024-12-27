// regular expression for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

// -------------------------------------------------- //

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
 


 // Address Class
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
      console.log(addresses);
      
      addresses.push(address)
      localStorage.setItem('addresses',JSON.stringify(addresses));
    }



    //get address
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

    static deleteAddress(id){
        const addresses = Address.getAddresses();
        addresses.forEach((address, index) => {
            if(address.id == id){
                addresses.splice(index,1)
            }
        });
        localStorage.setItem('addresses', JSON.stringify(addresses));
        form.reset();
        UI.closeModal();
        addrBookList.innerHTML = "";
        UI.showAddressList();
    }

    static updateAddress(item){
        let addresses = Address.getAddresses();
        addresses.forEach(address => {
            if(address.id == item.id){
                address.addrName = item.addrName;
                address.firstName = item.firstName;
                address.lastName = item.lastName;
                address.email = item.email;
                address.phone = item.phone;
                address.streetAddr = item.streetAddr;
                address.postalCode = item.postalCode;
                address.city = item.city;
                address.country = item.country;
                address.labels = item.labels;
            }
        })
        localStorage.setItem('addresses', JSON.stringify(addresses));
        addrBookList.innerHTML = "";
        UI.showAddressList();
        
    }
 }

//UI Class
class UI {

    static showAddressList(){
        const addresses = Address.getAddresses();
        addresses.forEach(address => UI.addToAddressList(address))
    }
    static addToAddressList(address){
        const tabelRow = document.createElement('tr');
        tabelRow.setAttribute('data-id',address.id )
        tabelRow.innerHTML = `
                               <td>${address.id}</td>
                                <td>
                                    <span class = "addressing-name">${address.addrName}</span><br><span class = "address">${address.streetAddr} ${postalCode} ${address.city} ${address.country}</span>
                                </td>
                                <td><span>${address.labels}</span></td>
                                <td>${address.firstName + " " + lastName}</td>
                                <td>${address.phone}</td>
        `;
        addrBookList.appendChild(tabelRow)
    }

    static showModalData(id){
        const addresses = Address.getAddresses();
        addresses.forEach(address => {
            if(address.id == id){
                form.addr_ing_name.value = address.addrName;
                form.first_name.value = address.firstName;
                form.last_name.value = address.lastName;
                form.email.value = address.email;
                form.phone.value = address.phone;
                form.street_addr.value =  address.streetAddr;
                form.postal_code.value = address.postalCode;
                form.city.value = address.city;
                form.country.value = address.country;
                form.labels.value = address.labels;
                
                document.getElementById('modal-title').innerHTML = "Change Address Details"

                document.getElementById('modal-btns').innerHTML = `
                <button type="submit" id="update-btn"  data-id="${id}" >Update </button>
                <button type="button" id="delete-btn"  data-id="${id}" >Delete </button>
                `;
                // UI.showModal()
            }
        })
    };

    static showModal(){
        modal.style.display = "block";
        fullscreenDiv.style.display = "block"
    }

    static closeModal(){
        modal.style.display = "none";
        fullscreenDiv.style.display = "none"
        
    }
}




 // DOM Content Loading
window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    cityLoad();
    eventListerens();
    UI.showAddressList();
})


// eventListerns
function eventListerens(){
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
            // console.log(isFormValid);
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input => 
                    {
                        setTimeout(() => {
                            input.classList.remove('errorMsg')
                        }, 1500)
                    })
            }else{
                let allItem  = Address.getAddresses();
                let lastItemId = (allItem.length > 0  ) ? allItem[allItem.length - 1].id : 0;
                lastItemId++; 

                const addressItem = new Address(lastItemId,addrName,firstName, lastName, email, phone, streetAddr, city, postalCode, country,labels);
                Address.addAddress(addressItem);
                UI.closeModal();
                UI.addToAddressList(addressItem);
                form.reset()
            }
            
        }
    })
    
    // tabel row item
    addrBookList.addEventListener('click', (event) => {
        // UI.showModal();
        let trElement ;
        // console.log(event.target);   
        if(event.target.parentElement.tagName === 'TD'){
            trElement = event.target.parentElement.parentElement
        }
        if(event.target.parentElement.tagName === 'TR'){
            trElement = event.target.parentElement;
        }
        let viewId = trElement.dataset.id;
        UI.showModalData(viewId);
               
        // delete an address item
        modalBtns.addEventListener('click', (event) => {
            if(event.target.id == 'delete-btn'){
                Address.deleteAddress(event.target.dataset.id);
            }
        })
    });

    // update an address item
    modalBtns.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.id == 'update-btn'){
            let id = event.target.dataset.id;
            let isFormValid = getFormData()
            if(!isFormValid){
                form.querySelectorAll('input').forEach((input) => {
                    setTimeout(() => {
                        input.classList.remove('errorMsg')
                    },1500)
                })
            }else{
                const addressItem = new Address(id,addrName,firstName, lastName, email, phone, streetAddr, city, postalCode, country,labels)
                Address.updateAddress(addressItem);
                UI.closeModal();
                form.reset();
            }
        }
    })
}

// Countries API fetch
function loadJSON() {
    fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        let html = ""
        data?.forEach((country) => {
            html += `
            <option>${country.country}</option>
            `;
        })
        countryList.innerHTML = html;
        
    })
}


// Cities API fetch 
 function cityLoad(){
    fetch('cities.json')
    .then(response => response.json())
    .then(data => {
        let html = "";
        // console.log("cities", data);
        data?.forEach((city) => {
            html += `
            <option>${city.city}</option>
            `
        })
        cityList.innerHTML = html;
    })
 }


// get formData 
function  getFormData(){
    let inputValidStatus = []   
    // console.log(inputValidStatus);
    

    // mail address Regex
    if(!strRegex.test(form.addr_ing_name.value)  || form.addr_ing_name.value.trim().length === 0){
        addErrMsg(form.addr_ing_name);
        inputValidStatus[0] =  false
    }else{
        addrName = form.addr_ing_name.value
        inputValidStatus[0] = true
    }

    // first Name Regex
    if(!strRegex.test(form.first_name.value)  || form.first_name.value.trim().length === 0){
        addErrMsg(form.first_name);
        inputValidStatus[1] =  false
    }else{
        firstName = form.first_name.value
        inputValidStatus[1] = true
    }

    // Last Name Regex
    if(!strRegex.test(form.last_name.value)  || form.last_name.value.trim().length === 0){
        addErrMsg(form.last_name);
        inputValidStatus[2] =  false
    }else{
        lastName = form.last_name.value
        inputValidStatus[2] = true
    }

    // Email address Regex 
    if(!emailRegex.test(form.email.value)){
        addErrMsg(form.email);
        inputValidStatus[3] =  false
    }else{
        email = form.email.value
        inputValidStatus[3] = true
    }

    // Phone Regex
    if(!phoneRegex.test(form.phone.value)){
        addErrMsg(form.phone);
        inputValidStatus[4] =  false
    }else{
        phone = form.phone.value
        inputValidStatus[4] = true
    }

    //street addressed
    if(!(form.street_addr.value.trim().length > 0)){
        addErrMsg(form.street_addr);
        inputValidStatus[5] =  false
    }else{
        streetAddr = form.street_addr.value
        inputValidStatus[5] = true
    }

    // Postal Code Regex
    if(!digitRegex.test(form.postal_code.value)){
        addErrMsg(form.postal_code);
        inputValidStatus[6] =  false
    }else{
        postalCode = form.postal_code.value
        inputValidStatus[6] = true
    }

    //city regex 
    if(!strRegex.test(form.city.value) || form.city.value.trim().length === 0 ){
        addErrMsg(form.city);
        inputValidStatus[7] = false;
    }else{
        city = form.city.value;
        inputValidStatus[7] = true
    }
   country = form.country.value;
   labels = form.labels.value;
//    console.log(labels);
   
//    console.log(addrName, firstName , lastName , email , phone , streetAddr , city , postalCode , country , labels);
   return inputValidStatus.includes(false)  ? false : true;
}
function addErrMsg(inputBox){
    inputBox.classList.add('errorMsg');
}