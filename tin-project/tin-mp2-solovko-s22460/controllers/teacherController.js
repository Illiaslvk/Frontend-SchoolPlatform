const TeacherRepository = require('../repository/sequelize/TeacherRepository');

//list, form, form-details
exports.showTeacherList = (req, res, next) => {
    TeacherRepository.getTeachers()
        .then(teachers => {
            res.render('pages/teacher/list', {
                teachers: teachers,
                navLocation: 'teacher'
            })
        })
}

exports.showTeacherForm = (req, res, next) => {
    res.render('pages/teacher/form', {
        teacher: {},
        pageTitle: 'New teacher',
        formMode: 'createNew',
        btnLabel: 'Add teacher',
        formAction: '/teacher/add',
        navLocation: 'teacher',
        validationErrors: [],
    });
}
exports.showTeacherFormEdit = (req, res, next) => {
    const teacherId = req.params.teacherId;

    TeacherRepository.getTeachersById(teacherId)
        .then(teacher => {
            res.render('pages/teacher/form', {
                teacher: teacher,
                formMode: 'edit',
                pageTitle: 'Edit teacher',
                btnLabel: 'Edit teacher',
                formAction: '/teacher/edit',
                navLocation: 'teacher',
                validationErrors: [],
            });
        });
}

exports.showTeacherDetails = (req, res, next) => {
    const teacherId = req.params.teacherId;

    TeacherRepository.getTeachersById(teacherId)
        .then(teacher => {
            res.render('pages/teacher/form', {
                teacher: teacher,
                formMode: 'showDetails',
                pageTitle: 'Teacher details',
                formAction: '',
                navLocation: 'teacher',
                validationErrors: [],
            });
        });
}
exports.addTeacher = (req, res, next) => {
    const teacherData = { ...req.body };

    TeacherRepository.createTeacher(teacherData)
        .then( result => {
            res.redirect('/teacher');
        }).catch(err => {
            res.render('pages/teacher/form',{
                teacher: teacherData,
                formMode: 'createNew',
                pageTitle: 'New teacher',
                btnLabel: 'Add teacher',
                formAction: '/teacher/add',
                navLocation: 'teacher',
                validationErrors: err.errors
        })
    })
};
exports.updateTeacher = (req, res, next) => {
    const teacherId = req.body._id;
    const teacherData = { ...req.body };

    TeacherRepository.updateTeacher(teacherId, teacherData)
        .then( result => {
            res.redirect('/teacher');
        }).catch(err =>{
        res.render('pages/teacher/form', {
            teacher: teacherData,
            formMode: 'edit',
            pageTitle: 'Edit teacher',
            btnLabel: 'Edit teacher',
            formAction: '/teacher/edit',
            navLocation: 'teacher',
            validationErrors: err.errors
        })
    })
};

exports.deleteTeacher = (req, res, next) => {
    const teacherId = req.params.teacherId;

    TeacherRepository.deleteTeacher(teacherId)
        .then( () => {
            res.redirect('/teacher');
        });
};