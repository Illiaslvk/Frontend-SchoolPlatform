const GradeRepository = require('../repository/sequelize/GradeRepository');
const TeacherRepository = require("../repository/sequelize/TeacherRepository");
const StudentRepository = require("../repository/sequelize/StudentRepository");

//list, form, form-details
exports.showGradesList = (req, res, next) => {
    GradeRepository.getGrades()
        .then(grades => {
            res.render('pages/grades/list', {
                grades: grades,
                pageTitle: 'Grades list',
                navLocation: 'grades'
            })
        })
}
exports.showGradesForm = (req, res, next) => {
    let allStudents, allTeachers, allGrades;

    GradeRepository.getGrades()
        .then(grades => {
            allGrades = grades;
            return StudentRepository.getStudents();
        })
        .then(students => {
            allStudents = students;
            return TeacherRepository.getTeachers();
        })
        .then(teachers => {
            allTeachers = teachers;
            res.render('pages/grades/form', {
                grade: {},
                allGrades: allGrades,
                allStudents: allStudents,
                allTeachers: allTeachers,
                formMode: 'createNew',
                pageTitle: 'New grade',
                btnLabel: 'Add grade',
                formAction: '/grades/add',
                navLocation: 'grades',
                validationErrors: [],
            });
        });
}
exports.showGradesFormEdit = (req, res, next) => {
    const gradesId = req.params.gradesId;
    let allStudents, allTeachers, allGrades;

    GradeRepository.getGrades()
        .then(grades => {
            allGrades = grades;
            return StudentRepository.getStudents();
        })
        .then(students => {
            allStudents = students;
            return TeacherRepository.getTeachers();
        })
        .then(teachers => {
            allTeachers = teachers;
            return GradeRepository.getGradesById(gradesId);
        })
        .then(grade => {
            res.render('pages/grades/form', {
                grade: grade,
                allStudents: allStudents,
                allTeachers: allTeachers,
                allGrades: allGrades,
                formMode: 'edit',
                pageTitle: 'Edit grade',
                btnLabel: 'Edit grade',
                formAction: '/grades/edit',
                navLocation: 'grades',
                validationErrors: [],
            });
        });
}
exports.showGradesDetails = (req, res, next) => {
    const gradesId = req.params.gradesId;
    let allStudents, allTeachers;

    StudentRepository.getStudents()
        .then(students => {
            allStudents = students;
            return TeacherRepository.getTeachers();
        })
        .then(teachers => {
            allTeachers = teachers;
            return GradeRepository.getGradesById(gradesId)
        })
        .then(grade => {
            res.render('pages/grades/form', {
                grade: grade,
                allStudents: allStudents,
                allTeachers: allTeachers,
                formMode: 'showDetails',
                pageTitle: 'Grades details',
                formAction: '',
                navLocation: 'grades',
                validationErrors: [],
            });
        });
}

exports.addGrades = (req, res, next) => {
    let allStudents, allTeachers,allGrades;
    const gradeData = { ...req.body };

    StudentRepository.getStudents()
        .then(students => {
            allStudents = students;
            return TeacherRepository.getTeachers();
        })
        .then(teachers => {
            allTeachers = teachers;
            return GradeRepository.createGrades(gradeData);
        })
        .then( result => {
            res.redirect('/grades');
        })
        .catch(err => {
            res.render('pages/grades/form',{
                grade: gradeData,
                allStudents: allStudents,
                allTeachers: allTeachers,
                allGrades: allGrades,
                formMode: 'createNew',
                pageTitle: 'New Grade',
                btnLabel: 'Add Grade',
                formAction: '/grades/add',
                navLocation: 'grades',
                validationErrors: err.errors,
            });
        });
};



exports.updateGrades = (req, res, next) => {
    const gradesId = req.body._id;
    const gradeData = {...req.body};

    let allStudents,allTeachers,allGrades;
    GradeRepository.getGrades()
        .then(grades => {
            allGrades = grades;
            return StudentRepository.getStudents();
        })
        .then(students => {
            allStudents = students;
            return GradeRepository.updateGrades(gradesId,gradeData);

        })
        .then(result => {
            res.redirect('/grades');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('idStudent')) {
                    e.message = "ok";
                }
            })

            GradeRepository.getGradesById(gradesId)
                .then(grade => {
                    gradeData.student =  StudentRepository.getStudentsById(grade.idStudent);
                    res.render('pages/grades/form', {
                        grade: gradesId,
                        allStudents: allStudents,
                        allTeachers: allTeachers,
                        allGrades: allGrades,
                        formMode: 'edit',
                        pageTitle: 'Edit grade',
                        btnLabel: 'Edit grade',
                        formAction: '/grades/edit',
                        navLocation: 'grades',
                        validationErrors: err.errors
                    })
                })
        })
};

exports.deleteGrades = (req, res, next) => {
    const gradesId = req.params.gradesId;

    GradeRepository.deleteGrades(gradesId)
        .then(() => {
            res.redirect('/grades');
        })
        .catch(err => {
            res.render('pages/grades/form', {
                grade: gradeData,
                pageTitle: 'Delete grade',
                formMode: 'delete',
                btnLabel: 'Delete grade',
                formAction: '/grades/delete',
                navLocation: 'grades'
            })
        });
};
