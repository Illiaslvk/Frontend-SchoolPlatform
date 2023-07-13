export function resetErrors (inputs, errorTexts, errorInfo) {
  for(let i=0; i<inputs.length; i++) {
    inputs[i].classList.remove("error-input");
  }
  for (let i=0; i<errorTexts.length; i++) {
    errorTexts[i].innerText = "";
  }
  errorInfo.innerText = "";
}
export function checkRequired(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  if (value === "") {
    return false;
  }
  return true;
}

export function checkTextLengthRange(value, min, max) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const length = value.length;

  if (max && length > max) {
    return false;
  }
  return !(min && length < min);

}
export function checkTextLengthRangePesel(text, minLength, maxLength) {
  if (text === "") return true;
  if (text.length >= minLength && text.length <= maxLength ) {
    return true;
  }
  return false;
}
export function checkNumberPesel(text) {
  if (!isNaN(text)) {
    return true;
  }
  return false;
}


export function checkNumber (value) {
  if (!value) {
    return false;
  }
  return !isNaN(value);

}
export function checkEmail(value) {
  if (!value)
    return false;

  value = value.toString().trim();
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return re.test(value);
}
export function checkNumberRange(value, min, max) {
  if (!value) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  value = parseFloat(value);

  if (value < min) {
    return false;
  }
  return value <= max;


}