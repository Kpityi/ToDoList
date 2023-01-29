import { STRINGS } from './utils/constants.js';
import { ATTRIBUTES, CLASSES, ELEMENTS, IDS, EVENTS } from './utils/htmlConstants.js';
import { validateInput, findHighestId } from './utils/helpers.js';
import RowData from './classes/rowData.js';
import {
  getLocalStorage,
  setLocalStorage,
  removeFromLocalStorage
} from './utils/storageHandlers.js';
import { STORAGE_KEYS } from './utils/storageConfig.js';

const addButton = document.getElementById(IDS.ADD_BUTTON);
const clearButton = document.getElementById(IDS.CLEAR_BUTTON);
const inputField = document.getElementById(IDS.INPUT);
const toDoList = document.getElementById(IDS.TO_DO_LIST);

let numberOfRows = 0;

const createNewRow = event => {
  event.preventDefault();
  const inputText = inputField.value;

  if (!validateInput(inputText)) {
    return;
  }

  const highestId = findHighestId(getLocalStorage(STORAGE_KEYS.TO_DO_LIST) || []);
  const rowData = new RowData({ id: highestId + 1, label: inputText });
  
  renderRow(rowData);
  saveRow(rowData);
  inputField.value = '';
};

const clearList = () => {
  toDoList.innerHTML = '';
  removeFromLocalStorage(STORAGE_KEYS.TO_DO_LIST);
  numberOfRows = 0;
};

const handleCheckbox = rowId => event => {
  const isDone = event.target.checked;

  event.target.parentNode.classList.toggle(CLASSES.DONE);

  const toDoList = getLocalStorage(STORAGE_KEYS.TO_DO_LIST) || [];
  const savedRow = toDoList.find(item => item.id === rowId);
  if (savedRow) {
    savedRow.isDone = isDone;
  }
  setLocalStorage(STORAGE_KEYS.TO_DO_LIST, toDoList);
};

const renderRow = rowData => {
  const row = document.createElement(ELEMENTS.P);
  row.classList.add(CLASSES.ROW);
  row.innerHTML = `
    <span>${numberOfRows + 1}.</span> 
    <span class="${CLASSES.LIST_ELEMENT}">${rowData.label}</span>
  `;
  if (rowData.isDone) {
    row.classList.add(CLASSES.DONE);
  }

  const checkbox = document.createElement(ELEMENTS.INPUT);
  checkbox.setAttribute(ATTRIBUTES.TYPE, STRINGS.CHECKBOX);
  checkbox.setAttribute(ATTRIBUTES.NAME, STRINGS.FINISHED);
  checkbox.classList.add(CLASSES.FINISHED_CHECKBOX);
  checkbox.checked = rowData.isDone;
  checkbox.onclick = handleCheckbox(rowData.id);

  row.appendChild(checkbox);
  toDoList.appendChild(row);
  
  numberOfRows++;
};

const saveRow = newRow => {
  const rowList = getLocalStorage(STORAGE_KEYS.TO_DO_LIST) || [];
  rowList.push(newRow);
  setLocalStorage(STORAGE_KEYS.TO_DO_LIST, rowList);
};

const loadToDoList = () => {
  const savedRowList = getLocalStorage(STORAGE_KEYS.TO_DO_LIST) || [];
  savedRowList.forEach(row => renderRow(row));
}

addButton.addEventListener(EVENTS.CLICK, createNewRow);
clearButton.addEventListener(EVENTS.CLICK, clearList);

loadToDoList();
