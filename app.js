let BTN = document.getElementById("BTN");
let clearBTN = document.getElementById("clear");
let newListElement = document.getElementById("Add")
let ToDoList = document.getElementById("ToDoList");
let number = 1;
let element = document.getElementsByClassName("element")


BTN.addEventListener('click', function(event){
  event.preventDefault();
  let listTemplate = "";
  let listElement = "";
  
  listElement = newListElement.value
  if(listElement.match(/^[0-9a-zA-ZáéőúűóöüíÉÁŐÚŰÓÜÖÍ" ",.-]{1,25}$/)){
    listTemplate = 
    `<p class="element">
    <span>${number}. </span> 
    <span>${listElement}</span>
    <input type="checkbox" name="finished" class="finished">
   </p> `
  
    ToDoList.innerHTML += listTemplate;
    newListElement.value=""
   number ++
  }
  else{
    alert("illegális karakter")
  }
  let checkbox=document.getElementsByClassName('finished');
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick= function(){
      this.parentNode.classList.toggle("done")
    }
  
}  
})



clearBTN.addEventListener('click', function(){
  ToDoList.innerHTML =""
  number = 1
  
})
