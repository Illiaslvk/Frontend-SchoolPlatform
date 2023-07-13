import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGradesApiCall } from '../../apiCalls/gradesApiCalls'
import GradesListTable from './GradesListTable'

function GradesList() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [grades, setGrades] = useState([])
  let content;

  function fetchGradesList() {
    getGradesApiCall()
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true)
          setGrades(data)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  useEffect(() => {
    fetchGradesList()
  }, [])

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (!isLoaded) {
    content = <p>Loading grades data...</p>
  } else if (grades.length === 0) {
    content = <p>No grades.</p>
  } else {
    content = <GradesListTable gradesList={grades} />
  }

  return (
    <main>
      <h2>Grades list</h2>
      { content }
      <p className="form-buttons">
        <Link to="/grades/add" className="button-add">Add new grade</Link>
      </p>
    </main>
  )
}

export default GradesList