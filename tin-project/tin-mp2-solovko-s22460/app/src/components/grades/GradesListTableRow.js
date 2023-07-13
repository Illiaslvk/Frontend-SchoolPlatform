import { Link } from "react-router-dom"

function GradesListTableRow(props) {
  const grades = props.gradesData
  return (
    <tr>
      <td>{grades.student.firstName}</td>
      <td>{grades.grade}</td>
      <td>
        <ul className="list-actions">
          <li><Link to={`/grades/details/${grades._id}`} className="list-actions-button-details">Details</Link></li>
          <li><Link to={`/grades/edit/${grades._id}`} className="list-actions-button-edit">Edit</Link></li>
          <li><Link to={`/grades/delete/${grades._id}`} className="list-actions-button-delete">Delete</Link></li>
        </ul>
      </td>
    </tr>
  )
}

export default GradesListTableRow