import {Link} from "react-router-dom";
import { getStudentsApiCall } from '../../apiCalls/studentApiCalls'
import {useEffect, useState} from "react";
import StudentListTable from "./StudentListTable";

function StudentList() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [students, setStudents] = useState([])
  const studentList = getStudentsApiCall()

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

  let content;

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (!isLoaded) {
    content = <p>Loading students data...</p>
  } else {
    content = <StudentListTable studList={students} />
  }

  return (
    <main>
      <h2>Students list</h2>
      { content}
      <p className="form-buttons">
        <Link to="/students/add" className="button-add">Add new student</Link>
      </p>
    </main>
  )

  // return (
  //   <main>
  //     <h2>Students Information</h2>
  //     <table className="table-list">
  //       <thead>
  //       <tr>
  //         <th>FirstName</th>
  //         <th>Email</th>
  //         <th>Actions</th>
  //       </tr>
  //       </thead>
  //       <tbody>
  //       {studentList.map(stud => (
  //         <tr key={stud._id}>
  //           <td>{stud.firstName}</td>
  //           <td>{stud.email}</td>
  //           <td>
  //             <ul className="list-actions">
  //               <li><Link to={`/students/details/${stud._id}`} className="list-actions-button-details">Details</Link></li>
  //               <li><Link to={`/students/edit/${stud._id}`} className="list-actions-button-edit">Edit</Link></li>
  //               <li><Link to={`/students/delete/${stud._id}`} className="list-actions-button-delete">Delete</Link></li>
  //             </ul>
  //           </td>
  //         </tr>
  //       ))}
  //       </tbody>
  //     </table>
  //     <p className="form-buttons">
  //       <Link to="/students/add" className="form-button-submit">Add new student</Link>
  //     </p>
  //   </main>
  // )
}

export default StudentList