const Student = require("../../model/sequelize/Student");
const Grades = require("../../model/sequelize/Grades");
const Teacher = require("../../model/sequelize/Teacher");

exports.getStudents = () => {
    return Student.findAll();
};

exports.getStudentsById = (studentId) => {
    return Student.findByPk(studentId,
        {
            include: [{
                model: Grades,
                as: 'grades',
                include: [{
                    model: Teacher,
                    as: 'teacher'
                }]
            }]
        });
};

exports.createStudent = (newStudentData) => {
    return Student.create({
        pesel: newStudentData.pesel,
        firstName: newStudentData.firstName,
        lastName: newStudentData.lastName,
        email: newStudentData.email
    });
};

exports.updateStudent = (studentId, studentData) => {
    const pesel = studentData.pesel;
    const firstName = studentData.firstName;
    const lastName = studentData.lastName;
    const email = studentData.email;
    return Student.update(studentData, {where: {_id: studentId }});
};

exports.deleteStudent = (studentId) => {
    return Student.destroy({
        where: { _id: studentId }
    });
};