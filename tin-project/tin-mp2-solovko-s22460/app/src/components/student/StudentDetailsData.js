function StudentDetailsData(props) {
  const stud = props.studData
  return (
    <>
      <p>Pesel: {stud.pesel}</p>
      <p>FirstName: {stud.firstName} </p>
      <p>LastName: {stud.lastName} </p>
      <p>Email: {stud.email} </p>
      <h2>Grade details</h2>
      <table className="table-list">
        <thead>
        <tr>
          <th>Subject</th>
          <th>Grade</th>
          <th>TeacherName</th>
          <th>TeacherLastName</th>
        </tr>
        </thead>
        <tbody>
        {stud.grades.map(
          grade =>
            <tr key={grade._id}>
              <td>{grade.subject}</td>
              <td>{grade.grade}</td>
              <td>{grade.teacher.firstName}</td>
              <td>{grade.teacher.lastName}</td>
            </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default StudentDetailsData