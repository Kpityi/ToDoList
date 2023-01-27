let BTN = document.getElementById("BTN");
let clearBTN = document.getElementById("clear");
let newListElement = document.getElementById("Add")
let ToDoList = document.getElementById("ToDoList");
let checkbox=document.getElementsByClassName('finished');
let element = document.getElementsByClassName("element");
const SavedList = JSON.parse(localStorage.getItem('MyToDoList'));
let number = 1;
let elementIndex=0;
let elements= [];
let listElement = "";
let listTemplate = "";

if (localStorage.length > 0) {
  LoadMyToDoList();
}


BTN.addEventListener('click', function(event){
  event.preventDefault();
   elements= [];
  
  listElement = newListElement.value;
  if(listElement.match(/^[0-9a-zA-ZáéőúűóöüíÉÁŐÚŰÓÜÖÍ" ",.-]{1,25}$/)){
    
    Render();
    SaveLocalStorage();

  }
  else{
    alert("illegális karakter");
  }
  
  check();
  
})



clearBTN.addEventListener('click', function(){
  ToDoList.innerHTML ="";
  number = 1;
  elementIndex=0;
  localStorage.clear();
  elements=[];
  
})

function check(){
  checkbox=document.getElementsByClassName('finished');
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick= function(){
      this.parentNode.classList.toggle("done");
    }
  }  
}

function Render(){
  listTemplate = 
    `<p class="element">
    <span>${number}. </span> 
    <span class="listElement" >${listElement}</span>
    <input type="checkbox" name="finished" class="finished">
   </p> `
  
    ToDoList.innerHTML += listTemplate;
    newListElement.value="";
    number ++;  
};

function SaveLocalStorage(){
  elementIndex = document.querySelectorAll(".listElement").length;
  for (let i = 0; i < elementIndex; i++) {
    let elementValue = document.querySelectorAll(".listElement")[i].innerText;
    elements.push(elementValue);
    localStorage.setItem('MyToDoList', JSON.stringify(elements));
    }
    
};

function LoadMyToDoList(){
  for (let i = 0; i < SavedList.length; i++) {
    listElement = SavedList[i];
    Render();
    check();
  }
}