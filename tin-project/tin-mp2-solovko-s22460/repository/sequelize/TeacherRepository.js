const Student = require("../../model/sequelize/Student");
const Grades = require("../../model/sequelize/Grades");
const Teacher = require("../../model/sequelize/Teacher");

exports.getTeachers = () => {
    return Teacher.findAll();
};

exports.getTeachersById = (teacherId) => {
    return Teacher.findByPk(teacherId,
        {
            include: [{
                model: Grades,
                as: 'grades',
                include: [{
                    model: Student,
                    as: 'student'
                }]
            }]
        });
};

exports.createTeacher = (newTeacherData) => {
    return Teacher.create({
        firstName: newTeacherData.firstName,
        lastName: newTeacherData.lastName,
        salary: newTeacherData.salary,
        indexNumber: newTeacherData.indexNumber
    });
};

exports.updateTeacher = (teacherId, teacherData) => {
    const firstName = teacherData.firstName;
    const lastName = teacherData.lastName;
    const salary = teacherData.salary;
    const indexNumber = teacherData.indexNumber;
    return Teacher.update(teacherData, {where: {_id: teacherId }});
};

exports.deleteTeacher = (teacherId) => {
    return Teacher.destroy({
        where: { _id: teacherId }
    });

};