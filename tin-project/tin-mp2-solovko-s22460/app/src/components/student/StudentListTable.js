import StudentListTableRow from './StudentListTableRow'

function StudentListTable(props) {
  const students = props.studList
  return (
    <table className="table-list" >
      <thead>
      <tr>
        <th>FirstName</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {students.map(stud =>
        <StudentListTableRow studData={stud} key={stud._id} />
      )}
      </tbody>
    </table >
  )
}
export default StudentListTable