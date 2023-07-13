const TeacherRepository = require('../repository/sequelize/TeacherRepository');

exports.getTeachers = (req, res, next) => {
    TeacherRepository.getTeachers()
        .then(teachers => {
            res.status(200).json(teachers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTeacherById = (req, res, next) => {
    const teacherId = req.params.teacherId;

    TeacherRepository.getTeachersById(teacherId)
        .then(teacher => {
            if (!teacher) {
                res.status(404).json({
                    message: 'Teacher with id: ' + teacherId + ' not found'
                })
            } else {
                res.status(200).json(teacher);
            }
        });
};

exports.createTeacher = (req, res, next) => {
    TeacherRepository.createTeacher(req.body)
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

exports.updateTeacher = (req, res, next) => {
    const teacherId = req.params.teacherId;

    TeacherRepository.updateTeacher(teacherId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Teacher updated!', teacher: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteTeacher = (req, res, next) => {
    const teacherId = req.params.teacherId;

    TeacherRepository.deleteTeacher(teacherId)
        .then(result => {
            res.status(200).json({ message: 'Deleted teacher', teacher: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};