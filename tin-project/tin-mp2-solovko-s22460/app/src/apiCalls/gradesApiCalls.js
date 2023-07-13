import { gradesList, gradesDetailsList } from './gradesApiMockData'

const gradesBaseUrl = 'http://localhost:3000/api/grades'
export function getGradesApiCall() {
  const promise = fetch(gradesBaseUrl)
  return promise;
}

export function getGradesByIdApiCall(grdId) {
  const url = `${gradesBaseUrl}/${grdId}`;
  const promise = fetch(url);
  return promise;
}
export function addGradesApiCall(grd) {
  const grdString = JSON.stringify(grd)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: grdString
  }
  const promise = fetch(gradesBaseUrl, options);
  console.log(promise)
  return promise;
}
export function updateGradesApiCall(grdId, grd) {
  const url = `${gradesBaseUrl}/${grdId}`
  const grdString = JSON.stringify(grd)
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: grdString
  }
  const promise = fetch(url, options);
  return promise;
}