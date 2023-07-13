const GradeRepository = require('../repository/sequelize/GradeRepository');

exports.getGrades = (req, res, next) => {
    GradeRepository.getGrades()
        .then(grades => {
            res.status(200).json(grades);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getGradeById = (req, res, next) => {
    const gradesId = req.params.gradesId;

    GradeRepository.getGradesById(gradesId)
        .then(grade => {
            if (!grade) {
                res.status(404).json({
                    message: 'Grade with id: ' + gradesId + ' not found'
                })
            } else {
                res.status(200).json(grade);
            }
        });
};

exports.createGrade = (req, res, next) => {
    GradeRepository.createGrades(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateGrade = (req, res, next) => {
    const gradesId = req.params.gradesId;

    GradeRepository.updateGrades(gradesId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Grade updated!', grade: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteGrade = (req, res, next) => {
    const gradesId = req.params.gradesId;

    GradeRepository.deleteGrades(gradesId)
        .then(result => {
            res.status(200).json({ message: 'Deleted grade', grade: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};