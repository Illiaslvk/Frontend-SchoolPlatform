import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";
import FormMode from "../../helpers/formHelper";
import {checkRequired,} from "../../helpers/validationCommon";
import {addGradesApiCall, getGradesByIdApiCall, updateGradesApiCall} from "../../apiCalls/gradesApiCalls";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import {getTeachersApiCall} from "../../apiCalls/teacherApiCalls";
import FormSelectStudent from "../form/FormSelectStudent";
import FormSelectTeacher from "../form/FormSelectTeacher";
import FormSelectGrades from "../form/FormSelectGrades";
import FormSelectSubject from "../form/FormSelectSubject";

function GradesForm() {
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [grd, setGrd] = useState({
      'idStudent': '',
      'grade': '',
      'subject': '',
      'idTeacher': ''
    })
    const [errors, setErrors] = useState({
      'idStudent': '',
      'grade': '',
      'subject': '',
      'idTeacher': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { grdId } = useParams()
    const currentFormMode = grdId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

  function fetchStudentList() {
    getStudentsApiCall()
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true)
          setStudents(data)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  useEffect(() => {
    fetchStudentList()
  }, [])
  function fetchTeacherList() {
    getTeachersApiCall()
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true)
          setTeachers(data)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }
  useEffect(() => {
    fetchTeacherList()
  }, [])

  function fetchGradesDetails() {
    getGradesByIdApiCall(grdId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message)
          } else {
            setGrd(data)
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
      fetchGradesDetails()
    }
    if (redirect) {
      navigate('/grades')
    }
  }, [redirect])
  function handleChange(event) {
    const { name, value } = event.target
    const errorMessage = validateField(name, value)
    setErrors({
      ...errors,
      [name]: errorMessage
    })
    setGrd({
      ...grd,
      [name]: value
    })
  }

  function validateField(fieldName, fieldValue) {
    let errorMessage = ''
    if (fieldName === 'studentName') {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }

    if (fieldName === 'grade') {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }
    if (fieldName === 'subject') {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
      }
    }
    if (fieldName === 'teacherName') {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Field is required.";
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
        promise = addGradesApiCall(grd)
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateGradesApiCall(grdId, grd)
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
    Object.entries(grd).forEach(([key, value]) => {
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

  const pageTitle = currentFormMode === FormMode.NEW ? 'New grade' : 'Edit grade'

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit} >

        <FormSelectStudent
          type="text"
          label="Student Name:"
          required
          error={errors['idStudent']}
          name="idStudent"
          onChange={handleChange}
          value={grd['idStudent']}
          studs={students}
        />

        {/*<label htmlFor="studentName">Student: <abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<select id="studentName" name="studId" required>*/}
        {/*  <option value="">--- Choose student ---</option>*/}
        {/*  {allStuds.map(stud =>*/}
        {/*    (<option key={stud._id} value={stud._id} label={stud.firstName + " " + stud.lastName }></option>)*/}
        {/*  )}*/}
        {/*</select>*/}
        {/*<span id="errorStudent" className="errors-text"></span>*/}

        <FormSelectGrades
          label="Grades:"
          required
          error={errors['grade']}
          name="grade"
          onChange={handleChange}
          value={grd['grade']}
        />

        {/*<label htmlFor="grade">Grade: <abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<select id="grade" name="grdId" required>*/}
        {/*  <option value="">--- Choose grade ---</option>*/}
        {/*  <option value="1" label="1">1</option>*/}
        {/*  <option value="2" label="2">2</option>*/}
        {/*  <option value="3" label="3">3</option>*/}
        {/*  <option value="4" label="4">4</option>*/}
        {/*  <option value="5" label="5">5</option>*/}
        {/*</select>*/}
        {/*<span id="errorGrade" className="errors-text"></span>*/}

        <FormSelectSubject
          label="Subject:"
          required
          error={errors['subject']}
          name="subject"
          onChange={handleChange}
          value={grd['subject']}
        />

        {/*<label htmlFor="subject">Subject: <abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<select id="subject" name="subjectId" required>*/}
        {/*  <option value="">--- Choose subject ---</option>*/}
        {/*  <option value="PE">PE</option>*/}
        {/*  <option value="ASD">ASD</option>*/}
        {/*  <option value="MAD">MAD</option>*/}
        {/*</select>*/}
        {/*<span id="errorSubject" className="errors-text"></span>*/}

        <FormSelectTeacher
          type="text"
          label="Teacher Name:"
          required
          error={errors['idTeacher']}
          name="idTeacher"
          onChange={handleChange}
          value={grd['idTeacher']}
          tchrs={teachers}
        />

        {/*<label htmlFor="teacherName">Teacher: <abbr title="required" aria-label="required">*</abbr></label>*/}
        {/*<select id="department" name="deptId" required>*/}
        {/*  <option value="">--- Choose teacher ---</option>*/}
        {/*  {allTchrs.map(tchr =>*/}
        {/*    (<option key={tchr._id} value={tchr._id} label={tchr.firstName + " " + tchr.lastName}></option>)*/}
        {/*  )}*/}
        {/*</select>*/}
        {/*<span id="errorTeacher" className="errors-text"></span>*/}

        <FormButtons
          formMode={currentFormMode}
          error={globalErrorMessage}
          cancelPath="/grades"
        />

        {/*<div className="form-buttons">*/}
        {/*  <p id="errorsSummary" className="errors-text"></p>*/}
        {/*  <input className="form-button-submit" type="submit" value="Add" />*/}
        {/*  <Link to="/employment" className="form-button-cancel">Cancel</Link>*/}
        {/*</div>*/}

      </form>
    </main>
  )
}

export default GradesForm