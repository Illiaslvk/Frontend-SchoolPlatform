const express = require('express');
const router = express.Router();

const GradesApiController = require('../../api/GradesAPI');

router.get('/', GradesApiController.getGrades);
router.get('/:gradesId', GradesApiController.getGradeById);
router.post('/', GradesApiController.createGrade);
router.put('/:gradesId', GradesApiController.updateGrade);
router.delete('/:gradesId', GradesApiController.deleteGrade);

module.exports = router;