export const validateInput = text => {
  if (!(text.match(/^[0-9a-zA-ZáéőúűóöüíÉÁŐÚŰÓÜÖÍ" ",.-]{1,25}$/))) {
    alert("Illegális karakter");
    return false;
  } else {
    return true;
  }
};

export const findHighestId = objectArray => {
  if (!objectArray || !(objectArray instanceof Array)) {
    return 0;
  }

  return Math.max(...[0, ...objectArray.map(item => item.id)]);
};
