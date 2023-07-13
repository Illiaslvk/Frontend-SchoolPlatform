import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStudentByIdApiCall } from '../../apiCalls/studentApiCalls'
import StudentDetailsData from "./StudentDetailsData";

// import { getFormattedDate } from '../../helpers/dateHelper'

function StudentDetails() {
  let { studId } = useParams()
  studId = parseInt(studId)
  const [stud, setStud] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [message, setMessage] = useState(null)

  function fetchStudentDetails() {
    getStudentByIdApiCall(studId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.message) {
            setStud(null)
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
        }
      )
  }

  useEffect(() => {
    fetchStudentDetails()
  }, [])

  let content;

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (!isLoaded) {
    content = <p>Loading student data...</p>
  } else if (message) {
    content = <p>{message}</p>
  } else {
    content = <StudentDetailsData studData={stud} />
  }

  return (
    <main>
      <h2>Student data</h2>
      {content}
      <div className="form-buttons">
        <br/>
        <Link to="/students" className="form-button-cancel">Back</Link>
      </div>
    </main>
  )
  // return (
  //   <main>
  //     <h2>Student details</h2>
  //     <p>Pesel: {stud.pesel}</p>
  //     <p>FirstName: {stud.firstName} </p>
  //     <p>LastName: {stud.lastName} </p>
  //     <p>Email: {stud.email} </p>
  //     <h2>Grade details</h2>
  //     <table className="table-list">
  //       <thead>
  //       <tr>
  //         <th>Subject</th>
  //         <th>Grade</th>
  //         <th>TeacherName</th>
  //         <th>TeacherLastName</th>
  //       </tr>
  //       </thead>
  //       <tbody>
  //       {stud.grades.map(
  //         grade =>
  //           <tr key={grade._id}>
  //             <td>{grade.subject}</td>
  //             <td>{grade.grade}</td>
  //             <td>{grade.teacher.firstName }</td>
  //             <td>{grade.teacher.lastName }</td>
  //           </tr>
  //       )}
  //       </tbody>
  //     </table>
  //     <br></br>
  //     <div className="form-buttons">
  //       <Link to="/students" className="form-button-cancel">Back</Link>
  //     </div>
  //   </main>
  // )
}
export default StudentDetails