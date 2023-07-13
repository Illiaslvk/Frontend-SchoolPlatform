import { studentList, studentDetailsList } from './studentApiMockData'

const studentsBaseUrl = 'http://localhost:3000/api/students'
export function getStudentsApiCall() {
  const promise = fetch(studentsBaseUrl)
  return promise;
}

export function getStudentByIdApiCall(studId) {
  const url = `${studentsBaseUrl}/${studId}`;
  const promise = fetch(url);
  return promise;
}
export function addStudentApiCall(stud) {
  const studString = JSON.stringify(stud)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: studString
  }
  const promise = fetch(studentsBaseUrl, options);
  return promise;
}
export function updateStudentApiCall(studId, stud) {
  const url = `${studentsBaseUrl}/${studId}`
  const studString = JSON.stringify(stud)
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: studString
  }
  const promise = fetch(url, options);
  return promise;
}
