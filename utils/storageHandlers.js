import { DATA_TYPES } from './constants.js';
import { STORAGE_SCHEMA } from './storageConfig.js';

export const setLocalStorage = (key, value) => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  const dataType = STORAGE_SCHEMA[key];

  if (typeof value === DATA_TYPES.OBJECT) {
    if (value instanceof Array && dataType !== DATA_TYPES.ARRAY) {
      throw new Error(`Incorrect value type. Array was expected.`);
    }
    if (value instanceof Object && !(value instanceof Array) && dataType !== DATA_TYPES.OBJECT) {
      throw new Error(`Incorrect value type. Object was expected.`);
    }
  } else if (typeof value !== dataType) {
    throw new Error(`Incorrect value type. ${dataType} was expected, ${typeof value} was provided.`);
  }
  
  if (typeof value === DATA_TYPES.OBJECT) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = key => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  const dataType = STORAGE_SCHEMA[key];

  if (dataType === DATA_TYPES.STRING) {
    return localStorage.getItem(key) || '';
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const removeFromLocalStorage = key => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
