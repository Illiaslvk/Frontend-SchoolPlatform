const express = require('express');
const router = express.Router();

const StudentApiController = require('../../api/StudentAPI');

router.get('/', StudentApiController.getStudents);
router.get('/:studentId', StudentApiController.getStudentById);
router.post('/', StudentApiController.createStudent);
router.put('/:studentId', StudentApiController.updateStudent);
router.delete('/:studentId', StudentApiController.deleteStudent);

module.exports = router;