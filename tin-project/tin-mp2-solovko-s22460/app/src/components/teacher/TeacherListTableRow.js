import { Link } from 'react-router-dom';

function TeacherListTableRow(props) {
  const tchr = props.tchrData
  return (
    <tr>
      <td>{tchr.firstName}</td>
      <td>{tchr.indexNumber}</td>
      <td>
        <ul className="list-actions">
          <li><Link to={`/teachers/details/${tchr._id}`} className="list-actions-button-details">Details</Link></li>
          <li><Link to={`/teachers/edit/${tchr._id}`} className="list-actions-button-edit">Edit</Link></li>
          <li><Link to={`/teachers/delete/${tchr._id}`} className="list-actions-button-delete">Delete</Link></li>
        </ul>
      </td>
    </tr>
  )
}

export default TeacherListTableRow