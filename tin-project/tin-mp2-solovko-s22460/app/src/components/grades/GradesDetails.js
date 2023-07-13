import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGradesByIdApiCall } from '../../apiCalls/gradesApiCalls'
import GradesDetailsData from './GradesDetailsData'

function GradesDetails() {
  const [grades, setGrades] = useState({})
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [message, setMessage] = useState(null)

  let { grdId } = useParams()
  grdId = parseInt(grdId)

  function fetchGradesDetails() {
    getGradesByIdApiCall(grdId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.message) {
            setGrades(null)
            setMessage(data.message)
          } else {
            setGrades(data)
            setMessage(null)
          }
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  useEffect(() => {
    fetchGradesDetails()
  }, [])

  let content
  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (!isLoaded) {
    content = <p>Loading grades data...</p>
  } else {
    content = <GradesDetailsData gradesData={grades} />
  }

  return (
    <main>
      { content }
      <div className="form-buttons">
        <Link to="/grades" className="form-button-cancel">Back</Link>
      </div>
    </main>
  )
}

export default GradesDetails