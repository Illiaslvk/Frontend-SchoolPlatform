import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import FormMode from '../../helpers/formHelper'
import {addTeacherApiCall, getTeacherByIdApiCall, updateTeacherApiCall} from "../../apiCalls/teacherApiCalls";
import {checkRequired, checkTextLengthRange, checkNumber} from '../../helpers/validationCommon'
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

function TeacherForm() {
  const [tchr, setTchr] = useState({
    'firstName': '',
    'lastName': '',
    'salary': '',
    'indexNumber': ''
  })
  const [errors, setErrors] = useState({
    'firstName': '',
    'lastName': '',
    'salary': '',
    'indexNumber': ''
  })
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(null)
  const [message, setMessage] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const { tchrId } = useParams()
  const currentFormMode = tchrId ? FormMode.EDIT : FormMode.NEW
  const navigate = useNavigate()

  function fetchTeacherDetails() {
    getTeacherByIdApiCall(tchrId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message)
          } else {
            setTchr(data)
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
      fetchTeacherDetails()
    }if (redirect) {
      navigate('/teachers')
    }
  }, [redirect])
  function handleChange(event) {
    const { name, value } = event.target
    const errorMessage = validateField(name, value)
    setErrors({
      ...errors,
      [name]: errorMessage
    })
    setTchr({
      ...tchr,
      [name]: value
    })
  }
  function validateField(fieldName, fieldValue) {
    let errorMessage = ''
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
    if (fieldName === 'salary') {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      } else if (!checkNumber(fieldValue)) {
        errorMessage = "Field should be a number.";
    }else if(!checkTextLengthRange(fieldValue,2,20 )){
        errorMessage = "Field should contain from 2 to 20 digits.";
      }
    }
      if (fieldName === 'indexNumber') {
        if (!checkRequired(fieldValue)) {
          errorMessage = 'Field is required.'
        } else if (!checkNumber(fieldValue)) {
          errorMessage = "Field should be a number.";
        }else if(!checkTextLengthRange(fieldValue,2,20)){
          errorMessage = "Field should contain from 1 to 20 digits.";
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
        promise = addTeacherApiCall(tchr)
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateTeacherApiCall(tchrId, tchr)
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
    Object.entries(tchr).forEach(([key, value]) => {
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

  const pageTitle = currentFormMode === FormMode.NEW ? 'New teacher' : 'Edit teacher'

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>

        <FormInput
          type="text"
          label="First name"
          required
          error={errors['firstName']}
          name="firstName"
          placeholder="3-20 characters"
          onChange={handleChange}
          value={tchr['firstName']}
        />

        {/*<label htmlFor="firstName">First Name:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="firstName" id="firstName" placeholder="3 to 20 characters" value="" />*/}
        {/*<span id="errorFirstName" className="errors-text"></span>*/}

        <FormInput
          type="text"
          label="Last name"
          required
          error={errors['lastName']}
          name="lastName"
          placeholder="3-20 characters"
          onChange={handleChange}
          value={tchr['lastName']}
        />

        {/*<label htmlFor="lastName">Last Name:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="lastName" id="lastName" placeholder="3 to 20 characters" value="" />*/}
        {/*<span id="errorLastName" className="errors-text"></span>*/}

        <FormInput
          type="text"
          label="salary"
          required
          error={errors['salary']}
          name="salary"
          placeholder="2-20 digits"
          onChange={handleChange}
          value={tchr['salary']}
        />

        {/*<label htmlFor="salary">Salary:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="salary" id="salary" placeholder="2 to 20 digits" value="" />*/}
        {/*<span id="errorSalary" className="errors-text"></span>*/}

        <FormInput
          type="text"
          label="indexNumber"
          required
          error={errors['indexNumber']}
          name="indexNumber"
          placeholder="1-20 digits"
          onChange={handleChange}
          value={tchr['indexNumber']}
        />

        {/*<label htmlFor="indexNumber">IndexNumber:<abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<input type="text" name="indexNumber" id="indexNumber" placeholder="1 to 20 digits" value="" />*/}
        {/*<span id="errorIndexNumber" className="errors-text"></span>*/}

        <FormButtons
          formMode={currentFormMode}
          error={globalErrorMessage}
          cancelPath="/teachers"
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

export default TeacherForm