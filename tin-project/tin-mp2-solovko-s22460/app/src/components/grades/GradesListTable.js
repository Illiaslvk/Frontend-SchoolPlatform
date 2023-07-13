import GradesListTableRow from './GradesListTableRow'

function GradesListTable(props) {
  const grades = props.gradesList
  return (
    <table className="table-list">
      <thead>
      <tr>
        <th>StudentName</th>
        <th>Grade</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {grades.map(grade =>
        <GradesListTableRow gradesData={grade} key={grade._id} />
      )}
      </tbody>
    </table>
  )
}

export default GradesListTable