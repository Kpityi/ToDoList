const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const inputField = document.getElementById("input");
const toDoList = document.getElementById("to-do-list");

let rowNumber = 1;
let elements = [];
let listElement = "";

addButton.addEventListener('click', function (event) {
  event.preventDefault();
  elements = [];

  listElement = inputField.value;

  if (listElement.match(/^[0-9a-zA-ZáéőúűóöüíÉÁŐÚŰÓÜÖÍ" ",.-]{1,25}$/)) {

    render(rowNumber - 1);
    saveLocalStorage();

  }
  else {
    alert("illegális karakter");
  }
})

clearButton.addEventListener('click', function () {
  toDoList.innerHTML = "";
  rowNumber = 1;
  localStorage.clear();
  toDoItems = [];

})

const setCheckbox = (i) => (event) => {
  const isChecked = event.target.checked;

  event.target.parentNode.classList.toggle("done");

  const toDoList = JSON.parse(localStorage.getItem('myToDoList')) || [];

  if (toDoList.length > i) {
    toDoList[i].isChecked = isChecked;
    localStorage.setItem('myToDoList', JSON.stringify(toDoList));
  }
}

function render(i, savedList=null) {
  const row = document.createElement('p');
  row.classList.add('row');
  row.innerHTML = `
    <span>${rowNumber}. </span> 
    <span class="list-element" >${savedList?.label || listElement}</span>
  `;
  if (savedList?.isChecked) {
    row.classList.add('done');
  }

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'finished');
  checkbox.setAttribute('meta-index', i);
  checkbox.classList.add('finished-checkbox');
  checkbox.checked = savedList?.isChecked || false;
  checkbox.onclick = setCheckbox(i);

  row.appendChild(checkbox);
  toDoList.appendChild(row);

  inputField.value = "";
  rowNumber++;
};

function saveLocalStorage() {
  const rowList = document.querySelectorAll(".row");

  for (const row of rowList) {
    const valueContainer = row.querySelector('.list-element');
    const checkbox = row.querySelector('.finished-checkbox');

    const elementValue = {
      label: valueContainer.innerText,
      isChecked: checkbox.checked,
    };

    elements.push(elementValue);
    localStorage.setItem('myToDoList', JSON.stringify(elements));
  }
};

function loadMyToDoList() {
  const savedList = JSON.parse(localStorage.getItem('myToDoList')) || [];

  for (let i = 0; i < savedList.length; i++) {
    listElement = savedList[i];
    render(i, savedList[i]);
  }
}

loadMyToDoList();
