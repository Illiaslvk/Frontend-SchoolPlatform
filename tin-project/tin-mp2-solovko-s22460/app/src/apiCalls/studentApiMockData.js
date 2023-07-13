export const studentList = [
  {
    "_id": 1,
    "pesel": "69122675718",
    "firstName": "Illia",
    "lastName": "Slvk",
    "email": "illiaslvk@gmail.com",
  },
  {
    "_id": 2,
    "pesel": "04220817811",
    "firstName": "Arsen",
    "lastName": "Brk",
    "email": "arsenbrk@gmail.com",
  },
]

export const studentDetailsList = [
  {
    "_id": 1,
    "pesel": "69122675718",
    "firstName": "Illia",
    "lastName": "Slvk",
    "email": "illiaslvk@gmail.com",
    "grades": [
      {
        "_id": 1,
        "grade": "5",
        "subject": "PE",
        "tchr_id": 1,
        "stud_id": 1,
        "teacher": {
          "_id": 1,
          "firstName": "John",
          "lastName": "Smith",
          "salary": "2500",
          "indexNumber": "0001",
        }
      },
      {
        "_id": 3,
        "grade": "4",
        "subject": "PRO",
        "tchr_id": 2,
        "stud_id": 2,
        "teacher": {
          "_id": 2,
          "firstName": "Adam",
          "lastName": "Johnson",
          "salary": "1000",
          "indexNumber": "0002",
        }
      }
    ]
  },
  {
    "_id": 2,
    "pesel": "04220817811",
    "firstName": "Arsen",
    "lastName": "Brk",
    "email": "arsenbrk@gmail.com",
    "grades": [
      {
        "_id": 2,
        "grade": "3",
        "subject": "MAD",
        "tchr_id": 2,
        "stud_id": 1,
        "teacher": {
          "_id": 2,
          "firstName": "Carl",
          "lastName": "Master",
          "salary": "10000",
          "indexNumber": "0002",
        }
      }
    ]
  },
]