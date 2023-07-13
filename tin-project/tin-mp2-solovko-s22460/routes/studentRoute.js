const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.showStudentList);
router.get('/add', studentController.showStudentForm);
router.get('/edit/:studentId', studentController.showStudentFormEdit);
router.get('/details/:studentId', studentController.showStudentDetails);

router.post('/add', studentController.addStudent);
router.post('/edit', studentController.updateStudent);
router.get('/delete/:studentId', studentController.deleteStudent);

module.exports = router;