import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";
import FormMode from "../../helpers/formHelper";
import {addStudentApiCall, getStudentByIdApiCall, updateStudentApiCall} from "../../apiCalls/studentApiCalls";
import {checkRequired, checkTextLengthRange, checkEmail, checkTextLengthRangePesel, checkNumberPesel} from "../../helpers/validationCommon";

function StudentForm() {
  const [stud, setStud] = useState({
    'pesel': '',
    'firstName': '',
    'lastName': '',
    'email': ''
  })
  const [errors, setErrors] = useState({
    'pesel': '',
    'firstName': '',
    'lastName': '',
    'email': ''
  })
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(null)
  const [message, setMessage] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const { studId } = useParams()
  const currentFormMode = studId ? FormMode.EDIT : FormMode.NEW
  const navigate = useNavigate()

  function fetchStudentDetails() {
    getStudentByIdApiCall(studId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message)
          } else {
            setStud(data)
            setMessage(null)
          }
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        })
  }
  useEffect(() => {
    if (currentFormMode === FormMode.EDIT) {
      fetchStudentDetails()
    }if (redirect) {
      navigate('/students')
    }
  }, [redirect])
  function handleChange(event) {
    const { name, value } = event.target
    const errorMessage = validateField(name, value)
    setErrors({
      ...errors,
      [name]: errorMessage
    })
    setStud({
      ...stud,
      [name]: value
    })
  }
  function validateField(fieldName, fieldValue) {
    let errorMessage = ''
    if (fieldName === 'pesel') {
      if (!checkTextLengthRangePesel(fieldValue, 11, 11)) {
        errorMessage = "The field should contain between 0 and 11 digits.";
      } else if (!checkNumberPesel(fieldValue)) {
        errorMessage = "The field should be a number";
      }
    }

    if (fieldName === 'firstName') {
      if (!checkRequired(fieldValue)) {
        errorMessage = 'Field is required.'
      } else if (!checkTextLengthRange(fieldValue, 3, 20)) {
        errorMessage = 'Filed should contain from 3 to 20 characters.'
      }
    }
    if (fieldName === 'lastName') {
      if (!checkRequired(fieldValue)) {
        errorMessage = 'Field is required.'
      } else if (!checkTextLengthRange(fieldValue, 3, 20)) {
        errorMessage = 'Field should contain from 3 to 20 characters.'
      }
    }
    if (fieldName === 'email') {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkEmail(fieldValue)) {
        errorMessage = "Field should be name@domain.com.";
      }else if(!checkTextLengthRange(fieldValue,2,50 )){
        errorMessage = "Field should contain from 2 to 50 characters.";
      }
    }

    return errorMessage;
  }

  function handleSubmit(event) {
    event.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      let promise, response
      if (currentFormMode === FormMode.NEW) {
        promise = addStudentApiCall(stud)
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateStudentApiCall(studId, stud)
      }
      if (promise) {
        promise
          .then(
            (data) => {
              response = data
              if (response.status === 201 || response.status === 500) {
                return data.json()
              }
            }
          )
          .then(
            (data) => {
              if (!response.ok && response.status === 500) {
                const serverFieldsErrors = {...errors}
                for (const i in data) {
                  const errorItem = data[i]
                  const errorMessage = errorItem.message
                  const fieldName = errorItem.path
                  serverFieldsErrors[fieldName] = errorMessage
                }
                setErrors(serverFieldsErrors)
                setError(null)
              } else {
                setRedirect(true)
              }
            },
            (error) => {
              setError(error)
            }
          )
      }
    }
  }
  function validateForm() {
    let isValid = true
    let serverFieldsErrors = {...errors}
    Object.entries(stud).forEach(([key, value]) => {
      const errorMessage = validateField(key, value)
      serverFieldsErrors[key] = errorMessage
      if (errorMessage.length > 0) {
        isValid = false
      }
    })
    setErrors(serverFieldsErrors)
    return isValid
  }
  function hasErrors() {
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        return true
      }
    })
    return false
  }

  const errorsSummary = hasErrors() ? 'Form contains errors.' : ''
  const fetchError = error ? `Error: ${error.message}` : ''
  const globalErrorMessage = errorsSummary || fetchError || message

  const pageTitle = currentFormMode === FormMode.NEW ? 'New student' : 'Edit student'

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>

        <FormInput
          type="text"
          label="pesel"
          error={errors['pesel']}
          name="pesel"
          placeholder=" "
          onChange={handleChange}
          value={stud['pesel']}
        />

        {/*<label htmlFor="pesel">Pesel:<abbr title="" aria-label=""></abbr></label>*/}
        {/*<input type="text" name="pesel" id="pesel" placeholder="" value="" />*/}
        {/*<span id="errorStudentPesel" className="errors-text"></span>*/}

        <FormInput
          type="text"
          label="First name"
          required
          error={errors['firstName']}
          name="firstName"
          placeholder="3-20 characters"
          onChange={handleChange}
          value={stud['firstName']}
        />

        {/*<label htmlFor="firstName">First Name:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="firstName" id="firstName" placeholder="3 to 20 characters" value="" />*/}
        {/*<span id="errorFirstName" className="errors-text"></span>*/}

        <FormInput
          type="text"
          label="Last Name"
          required
          error={errors['lastName']}
          name="lastName"
          placeholder="3 to 20 characters"
          onChange={handleChange}
          value={stud['lastName']}
        />

        {/*<label htmlFor="lastName">Last Name:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="lastName" id="lastName" placeholder="3 to 20 characters" value="" />*/}
        {/*<span id="errorLastName" className="errors-text"></span>*/}

        <FormInput
          type="text"
          label="email"
          required
          error={errors['email']}
          name="email"
          placeholder="name@domain.pl"
          onChange={handleChange}
          value={stud['email']}
        />

        {/*<label htmlFor="email">Email:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="email" id="email" placeholder="name@domain.pl" value="" />*/}
        {/*<span id="errorStudentEmail" className="errors-text"></span>*/}

        <FormButtons
          formMode={currentFormMode}
          error={globalErrorMessage}
          cancelPath="/students"
        />

        {/*<div className="form-buttons">*/}
        {/*  <p id="errorsSummary" className="errors-text"></p>*/}
        {/*  <input className="form-button-submit" type="submit" value="Add" />*/}
        {/*  <Link to="/teachers" className="form-button-cancel">Cancel</Link>*/}
        {/*</div>*/}
      </form>
    </main >
  )
}

export default StudentForm