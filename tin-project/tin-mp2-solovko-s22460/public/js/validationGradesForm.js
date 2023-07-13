function validateForm() {
    // inputs
    const studentsNameInput = document.getElementById('idStudent');
    const selectGradeInput = document.getElementById('grade');
    const selectSubjectInput = document.getElementById('subject');
    const selectTeacherInput = document.getElementById('idTeacher');

    //inputErrors
    const errorStudentsName = document.getElementById('errorStudent');
    const errorSelectGrade = document.getElementById('errorGrade');
    const errorSelectSubject = document.getElementById('errorSubject');
    const errorSelectTeacher = document.getElementById('errorTeacher');
    // summary constant
    const errorSummary = document.getElementById('errorsSummary');

    //reset errors
    resetErrors([
        studentsNameInput,
        selectGradeInput,
        selectSubjectInput,
        selectTeacherInput
    ], [
        errorStudentsName,
        errorSelectGrade,
        errorSelectSubject,
        errorSelectTeacher
    ], errorSummary);

    let valid = true;

    //studentsName
    if (!checkRequired(studentsNameInput.value)) {
        valid = false;
        studentsNameInput.classList.add("error-input");
        errorStudentsName.innerText = "The field is required.";
    }
    //selectGrade
    debugger
    if (!checkRequired(selectGradeInput.value)) {
        valid = false;
        selectGradeInput.classList.add("error-input");
        errorSelectGrade.innerText = "The field is required.";
    }
    //selectSubject
    if (!checkRequired(selectSubjectInput.value)) {
        valid = false;
        selectSubjectInput.classList.add("error-input");
        errorSelectSubject.innerText = "The field is required.";
    }
    //selectTeacher
    if (!checkRequired(selectTeacherInput.value)) {
        valid = false;
        selectTeacherInput.classList.add("error-input");
        errorSelectTeacher.innerText = "The field is required.";
    }
    //Summary
    if (!valid) {
        errorSummary.innerText = "Form contains errors.";
        errorSummary.classList.add("errors-text");
    }
    return valid;
}