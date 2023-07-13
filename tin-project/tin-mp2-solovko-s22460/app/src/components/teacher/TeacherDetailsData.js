function TeacherDetailsData(props) {
  const tchr = props.tchrData
  return (
    <>
      <p>FirstName: {tchr.firstName}</p>
      <p>LastName: {tchr.lastName} </p>
      <p>Salary: {tchr.salary} </p>
      <p>IndexNumber: {tchr.indexNumber} </p>
      <h2>Grade details</h2>
      <table className="table-list">
        <thead>
        <tr>
          <th>Subject</th>
          <th>Grade</th>
          <th>StudentName</th>
          <th>StudentLastName</th>
        </tr>
        </thead>
        <tbody>
        {tchr.grades.map(
          grade =>
            <tr key={grade._id}>
              <td>{grade.subject}</td>
              <td>{grade.grade}</td>
              <td>{grade.student.firstName}</td>
              <td>{grade.student.lastName}</td>
            </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default TeacherDetailsData