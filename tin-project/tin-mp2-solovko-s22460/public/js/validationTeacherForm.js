function validateForm(){
  // inputs
  const firstNameInput = document.getElementById('FirstName');
  const lastNameInput = document.getElementById('LastName');
  const salaryInput = document.getElementById('Salary');
  const indexNumberInput = document.getElementById('indexNumber');
  
  //inputErrors 
  const errorFirstName = document.getElementById('errorFirstName');
  const errorLastName = document.getElementById('errorLastName');
  const errorSalary = document.getElementById('errorSalary');
  const errorIndexNumber = document.getElementById('errorindexNumber');

  //errorSummary
  const errorSummary = document.getElementById('errorsSummary');

  //reset errors
  resetErrors([firstNameInput,lastNameInput,salaryInput,indexNumberInput],[errorFirstName,errorLastName,errorSalary,errorIndexNumber],errorSummary);

  let valid = true;
  //FN
  if(!checkRequired(firstNameInput.value)){
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "The field is required.";
  } else if(!checkTextLengthRange(firstNameInput.value, 3,20)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "The field should contain 3 to 20 characters"
  }
  //LN
  if(!checkRequired(lastNameInput.value)){
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "The field is required.";
  } else if(!checkTextLengthRange(lastNameInput.value, 3,20)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "The field should contain 3 to 20 characters"
  }
  //Salary
  if (!checkRequired(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add('error-input');
        errorSalary.innerText = "The field is required.";
    } else if (!checkNumber(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add('error-input');
        errorSalary.innerText = "The field should be a number.";
    } else if (!checkNumberRange(salaryInput.value, 500, 100000)) {
        valid = false;
        salaryInput.classList.add('error-input');
        errorSalary.innerText = "The field should be a number from 500 to 100000.";
    }
  //Ind
  if(!checkRequired(indexNumberInput.value)){
    valid = false;
    indexNumberInput.classList.add("error-input");
    errorIndexNumber.innerText = "The field is required.";
  } else if(!checkTextLengthRange(indexNumberInput.value, 3,20)) {
    valid = false;
    indexNumberInput.classList.add("error-input");
    errorIndexNumber.innerText = "The field should contain 1 to 20 digits"
  }
  //Summary
  if(!valid){
    errorSummary.innerText = "Form contains errors.";
    errorSummary.classList.add("errors-text");
  }
  
  return valid;

}