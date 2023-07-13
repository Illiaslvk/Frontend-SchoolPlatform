import { Link } from 'react-router-dom';

function StudentListTableRow(props) {
  const stud = props.studData
  return (
    <tr>
      <td>{stud.firstName}</td>
      <td>{stud.email}</td>
      <td>
        <ul className="list-actions">
          <li><Link to={`/students/details/${stud._id}`} className="list-actions-button-details">Details</Link></li>
          <li><Link to={`/students/edit/${stud._id}`} className="list-actions-button-edit">Edit</Link></li>
          <li><Link to={`/students/delete/${stud._id}`} className="list-actions-button-delete">Delete</Link></li>
        </ul>
      </td>
    </tr>
  )
}

export default StudentListTableRow