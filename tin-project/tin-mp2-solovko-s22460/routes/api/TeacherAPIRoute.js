const express = require('express');
const router = express.Router();

const TeacherApiController = require('../../api/TeacherAPI');

router.get('/', TeacherApiController.getTeachers);
router.get('/:teacherId', TeacherApiController.getTeacherById);
router.post('/', TeacherApiController.createTeacher);
router.put('/:teacherId', TeacherApiController.updateTeacher);
router.delete('/:teacherId', TeacherApiController.deleteTeacher);

module.exports = router;