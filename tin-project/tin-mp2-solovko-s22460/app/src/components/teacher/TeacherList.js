import {Link} from "react-router-dom";
import { getTeachersApiCall } from '../../apiCalls/teacherApiCalls'
import {useEffect, useState} from "react";
import TeacherListTable from "./TeacherListTable";

function TeacherList() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [teachers, setTeachers] = useState([])
  const teacherList = getTeachersApiCall()

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

  let content;

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (!isLoaded) {
    content = <p>Loading teachers data...</p>
  } else {
    content = <TeacherListTable tchrList={teachers} />
  }

  return (
    <main>
      <h2>Teachers list</h2>
      { content}
      <p className="form-buttons">
        <Link to="/teachers/add" className="button-add">Add new teacher</Link>
      </p>
    </main>
  )

  // return (
  //   <main>
  //     <h2>Teachers Information</h2>
  //     <table className="table-list">
  //       <thead>
  //       <tr>
  //         <th>FirstName</th>
  //         <th>indexNumber</th>
  //         <th>Actions</th>
  //       </tr>
  //       </thead>
  //       <tbody>
  //       {teacherList.map(tchr => (
  //         <tr key={tchr._id}>
  //           <td>{tchr.firstName}</td>
  //           <td>{tchr.indexNumber}</td>
  //           <td>
  //             <ul className="list-actions">
  //               <li><Link to={`/teachers/details/${tchr._id}`} className="list-actions-button-details">Details</Link></li>
  //               <li><Link to={`/teachers/edit/${tchr._id}`} className="list-actions-button-edit">Edit</Link></li>
  //               <li><Link to={`/teachers/delete/${tchr._id}`} className="list-actions-button-delete">Delete</Link></li>
  //             </ul>
  //           </td>
  //         </tr>
  //       ))}
  //       </tbody>
  //     </table>
  //     <p className="form-buttons">
  //       <Link to="/teachers/add" className="form-button-submit">Add new teacher</Link>
  //     </p>
  //   </main>
  // )
}

export default TeacherList