function GradesDetailsData(props) {
  const grade = props.gradesData
  return (
    <>
      <p>Student Name: {grade.student.firstName}</p>
      <p>Grade: {grade.grade} </p>
      <p>Subject: {grade.subject} </p>
      <p>Teacher Name: {grade.teacher.firstName} </p>
    </>
  )
}

export default GradesDetailsData