const StudentRepository = require('../repository/sequelize/StudentRepository');
const TeacherRepository = require("../repository/sequelize/TeacherRepository");

//list, form, form-details
exports.showStudentList = (req, res, next) => {
    StudentRepository.getStudents()
        .then(students => {
            res.render('pages/student/list', {
                students: students,
                navLocation: 'student'
            })
        })
}

exports.showStudentForm = (req, res, next) => {
    res.render('pages/student/form', {
        student: {},
        pageTitle: 'New student',
        formMode: 'createNew',
        btnLabel: 'Add student',
        formAction: '/student/add',
        navLocation: 'student',
        validationErrors: [],
    });
}
exports.showStudentFormEdit = (req, res, next) => {
    const studentId = req.params.studentId;

    StudentRepository.getStudentsById(studentId)
        .then(student => {
            res.render('pages/student/form', {
                student: student,
                formMode: 'edit',
                pageTitle: 'Edit student',
                btnLabel: 'Edit student',
                formAction: '/student/edit',
                navLocation: 'student',
                validationErrors: [],
            });
        });
}
exports.showStudentDetails = (req, res, next) => {
    const studentId = req.params.studentId;

    StudentRepository.getStudentsById(studentId)
        .then(student => {
            res.render('pages/student/form', {
                student: student,
                formMode: 'showDetails',
                pageTitle: 'Student details',
                formAction: '',
                navLocation: 'student',
                validationErrors: [],
            });
        });
}
exports.addStudent = (req, res, next) => {
    const studentData = {...req.body};

    StudentRepository.createStudent(studentData)
        .then( result => {
            res.redirect('/student');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('email') && e.type == 'unique violation') {
                    e.message = "The email address already in use.";
                }
            });
            res.render('pages/student/form', {
                student: studentData,
                pageTitle: 'New student',
                formMode: 'createNew',
                btnLabel: 'Add student',
                formAction: '/student/add',
                navLocation: 'student',
                validationErrors: err.errors
            })

        })
};

exports.updateStudent = (req, res, next) => {
    const studentId = req.body._id;
    const studentData = {...req.body};

    StudentRepository.updateStudent(studentId, studentData)
        .then(result => {
            res.redirect('/student');
        }).catch(err =>{
        res.render('pages/student/form', {
            student: studentData,
            formMode: 'edit',
            pageTitle: 'Edit student',
            btnLabel: 'Edit student',
            formAction: '/student/edit',
            navLocation: 'student',
            validationErrors: err.errors
        })
    })
};

exports.deleteStudent = (req, res, next) => {
    const studentId = req.params.studentId;

    StudentRepository.deleteStudent(studentId)
        .then(() => {
            res.redirect('/student');
        });
};