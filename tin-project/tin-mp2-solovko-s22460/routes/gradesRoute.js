const express = require('express');
const router = express.Router();

const gradesController = require('../controllers/gradesController');

router.get('/', gradesController.showGradesList);
router.get('/add', gradesController.showGradesForm);
router.get('/edit/:gradesId', gradesController.showGradesFormEdit);
router.get('/details/:gradesId', gradesController.showGradesDetails);

router.post('/add', gradesController.addGrades);
router.post('/edit', gradesController.updateGrades);
router.get('/delete/:gradesId', gradesController.deleteGrades);

module.exports = router;