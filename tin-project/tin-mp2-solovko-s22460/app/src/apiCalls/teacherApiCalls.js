import { teacherDetailsList } from './teacherApiMockData'

const teachersBaseUrl = 'http://localhost:3000/api/teachers'
export function getTeachersApiCall() {
  const promise = fetch(teachersBaseUrl)
  return promise;
}

export function getTeacherByIdApiCall(tchrId) {
  const url = `${teachersBaseUrl}/${tchrId}`;
  const promise = fetch(url);
  return promise;
}

export function addTeacherApiCall(tchr) {
  const tchrString = JSON.stringify(tchr)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: tchrString
  }
  const promise = fetch(teachersBaseUrl, options);
  return promise;
}
export function updateTeacherApiCall(tchrId, tchr) {
  const url = `${teachersBaseUrl}/${tchrId}`
  const tchrString = JSON.stringify(tchr)
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: tchrString
  }
  const promise = fetch(url, options);
  return promise;
}