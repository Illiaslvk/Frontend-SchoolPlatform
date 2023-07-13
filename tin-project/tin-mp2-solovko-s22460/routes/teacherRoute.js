const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.showTeacherList);
router.get('/add', teacherController.showTeacherForm);
router.get('/edit/:teacherId', teacherController.showTeacherFormEdit);
router.get('/details/:teacherId', teacherController.showTeacherDetails);

router.post('/add', teacherController.addTeacher);
router.post('/edit', teacherController.updateTeacher);
router.get('/delete/:teacherId', teacherController.deleteTeacher);

module.exports = router;