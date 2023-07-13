function validateForm(){
    // inputs
    const studentPeselInput = document.getElementById('StudentPesel');
    const firstNameInput = document.getElementById('FirstName');
    const lastNameInput = document.getElementById('LastName');
    const studentEmailInput = document.getElementById('Email');
    
    //inputErrors 
    const errorStudentPesel = document.getElementById('errorStudentPesel');
    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorStudentEmail = document.getElementById('errorStudentEmail');

    //errorSummary
    const errorSummary = document.getElementById('errorsSummary');

    //reset errors
    resetErrors([studentPeselInput,firstNameInput,lastNameInput,studentEmailInput],[errorStudentPesel,errorFirstName,errorLastName,errorStudentEmail],errorSummary);
  
    let valid = true;
    //PESEL
    if (studentPeselInput.value != "" && !checkTextLengthRange(studentPeselInput.value)) {
        valid = false;
        studentPeselInput.classList.add("error-input");
        studentPeselInput.innerText = "The field should contain 11 digits.";
    }else if (!checkNumber(studentPeselInput.value)) {
        valid = false;
        studentPeselInput.classList.add("error-input");
        errorStudentPesel.innerText = "The field should be a number";
    }
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
      errorLastName.innerText = "The field should contain 3 to 20 digits"
    }
    //EMAIL
    if(!checkRequired(studentEmailInput.value)){
      valid = false;
      studentEmailInput.classList.add("error-input");
      errorStudentEmail.innerText = "The field is required.";
    } else if(!checkTextLengthRange(studentEmailInput.value, 3,50)) {
      valid = false;
      studentEmailInput.classList.add("error-input");
      errorStudentEmail.innerText = "The field should contain 3 to 50 characters";
    } else if(!checkEmail(studentEmailInput.value)) {
      valid = false;
      studentEmailInput.classList.add("error-input");
      errorStudentEmail.innerText = "The field should contain a valid email address"
    }
    //Summary
    if(!valid){
      errorSummary.innerText = "Form contains errors.";
      errorSummary.classList.add("errors-text");
    }
    
    return valid;
  
  }