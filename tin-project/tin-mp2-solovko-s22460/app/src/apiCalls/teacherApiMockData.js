export const teacherList = [
  {
    "_id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "salary": "2500",
    "indexNumber": "0001",
  },
  {
    "_id": 2,
    "firstName": "Adam",
    "lastName": "Johnson",
    "salary": "1000",
    "indexNumber": "0002",
  },
]

export const teacherDetailsList = [
  {
    "_id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "salary": "2500",
    "indexNumber": "0001",
    "grades": [
      {
        "_id": 1,
        "grade": "5",
        "subject": "PE",
        "tchr_id": 1,
        "stud_id": 1,
        "student": {
          "_id": 1,
          "pesel": "12345678910",
          "firstName": "Jamal",
          "lastName": "Cool",
          "email": "jamalBoss@gmail.com",
        }
      },
      {
        "_id": 3,
        "grade": "4",
        "subject": "PRO",
        "tchr_id": 1,
        "stud_id": 2,
        "student": {
          "_id": 2,
          "pesel": "12345678910",
          "firstName": "Arsen",
          "lastName": "Brk",
          "email": "arsenbrk@gmail.com",
        }
      }
    ]
  },
  {
    "_id": 2,
    "firstName": "Adam",
    "lastName": "Johnson",
    "salary": "1000",
    "indexNumber": "0002",
    "grades": [
      {
        "_id": 2,
        "grade": "3",
        "subject": "MAD",
        "tchr_id": 2,
        "stud_id": 1,
        "student": {
          "_id": 1,
          "pesel": "12345678910",
          "firstName": "Max",
          "lastName": "Clover",
          "email": "maxclover@gmail.com",
        }
      }
    ]
  },
]