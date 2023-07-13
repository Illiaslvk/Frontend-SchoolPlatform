import TeacherListTableRow from './TeacherListTableRow'

function TeacherListTable(props) {
  const teachers = props.tchrList
  return (
    <table className="table-list" >
      <thead>
      <tr>
        <th>FirstName</th>
        <th>indexNumber</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {teachers.map(tchr =>
        <TeacherListTableRow tchrData={tchr} key={tchr._id} />
      )}
      </tbody>
    </table >
  )
}
export default TeacherListTable