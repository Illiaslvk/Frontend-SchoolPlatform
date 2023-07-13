const Sequelize = require('sequelize');

const Grades = require('../../model/sequelize/Grades');
const Student = require('../../model/sequelize/Student');
const Teacher = require('../../model/sequelize/Teacher');

exports.getGrades = () => {
    return Grades.findAll({
        include: [
            {
                model: Student,
                as: 'student'
            },
            {
                model: Teacher,
                as: 'teacher'
            }]
    });
};


exports.getGradesById = (gradesId) => {
    return Grades.findByPk(gradesId, {
        include: [
            {
                model: Student,
                as: 'student'
            },
            {
                model: Teacher,
                as: 'teacher'
            }]
    });
};

exports.createGrades = (data) => {
    console.log(JSON.stringify(data));

    return Grades.create({
        idStudent: data.idStudent,
        idTeacher: data.idTeacher,
        grade: data.grade,
        subject: data.subject
    });
};

exports.updateGrades = (gradesId, data) => {
    return Grades.update(data, {where: {_id: gradesId }});
}

exports.deleteGrades = (gradesId) => {
    return Grades.destroy({
        where: { _id: gradesId }
    });
}

exports.deleteManyGrades = (gradesIds) => {
    return Grades.find({ _id: { [Sequelize.Op.in]: gradesIds }})
}

