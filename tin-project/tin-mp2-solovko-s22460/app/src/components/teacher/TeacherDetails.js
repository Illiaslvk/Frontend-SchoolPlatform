import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTeacherByIdApiCall } from '../../apiCalls/teacherApiCalls'
import TeacherDetailsData from "./TeacherDetailsData";
// import { getFormattedDate } from '../../helpers/dateHelper'

function TeacherDetails() {
  let { tchrId } = useParams()
  //tchrId = parseInt(tchrId)
  const [tchr, setTchr] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [message, setMessage] = useState(null)

  function fetchTeacherDetails() {
    getTeacherByIdApiCall(tchrId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.message) {
            setTchr(null)
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
        }
      )
  }

  useEffect(() => {
    fetchTeacherDetails()
  }, [])

  let content;

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (!isLoaded) {
    content = <p>Loading teacher data...</p>
  } else if (message) {
    content = <p>{message}</p>
  } else {
    content = <TeacherDetailsData tchrData={tchr} />
  }
  return (
    <main>
      <h2>Teacher data</h2>
      {content}
      <div className="form-buttons">
        <br/>
        <Link to="/teachers" className="form-button-cancel">Back</Link>
      </div>
    </main>
  )
  // return (
  //   <main>
  //     <h2>Teacher details</h2>
  //     <p>FirstName: {tchr.firstName}</p>
  //     <p>LastName: {tchr.lastName} </p>
  //     <p>Salary: {tchr.salary} </p>
  //     <p>IndexNumber: {tchr.indexNumber} </p>
  //     <h2>Grade details</h2>
  //     <table className="table-list">
  //       <thead>
  //       <tr>
  //         <th>Subject</th>
  //         <th>Grade</th>
  //         <th>StudentName</th>
  //         <th>StudentLastName</th>
  //       </tr>
  //       </thead>
  //       <tbody>
  //       {tchr.grades.map(
  //         grade =>
  //           <tr key={grade._id}>
  //             <td>{grade.subject}</td>
  //             <td>{grade.grade}</td>
  //             <td>{grade.student.firstName }</td>
  //             <td>{grade.student.lastName }</td>
  //           </tr>
  //       )}
  //       </tbody>
  //     </table>
  //     <br></br>
  //     <div className="form-buttons">
  //       <Link to="/teachers" className="form-button-cancel">Back</Link>
  //     </div>
  //   </main>
  // )
}
export default TeacherDetails