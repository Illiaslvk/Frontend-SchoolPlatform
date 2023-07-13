const sequelize = require('./sequelize');

const Student = require('../../model/sequelize/Student');
const Teacher = require('../../model/sequelize/Teacher');
const Grades = require('../../model/sequelize/Grades');

module.exports = () => {
    Student.hasMany(Grades, {as: 'grades', foreignKey: {name: 'idStudent', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Grades.belongsTo(Student, {as: 'student', foreignKey: {name: 'idStudent', allowNull: false} } );
    Teacher.hasMany(Grades, {as: 'grades', foreignKey: {name: 'idTeacher', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Grades.belongsTo(Teacher, {as: 'teacher', foreignKey: {name: 'idTeacher', allowNull: false} });

    let allStudents, allTeachers;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Student.findAll();
        })
        .then(students => {
            if( !students || students.length == 0 ) {
                return Student.bulkCreate([
                    {pesel: '69122675718', firstName: 'Illia', lastName: 'Slvk', email: 'illiaslvk@gmail.com'},
                    {pesel: '04220817811', firstName: 'Arsen', lastName: 'Brk', email: 'arsenbrk@gmail.com'},
                    {pesel: '93061711635', firstName: 'Vitka', lastName: 'Bb', email: 'vitkabb@gmail.com'},
                ])
                    .then( () => {
                        return Student.findAll();
                    });
            } else {
                return students;
            }
        })
        .then( students => {
            allStudents = students;
            return Teacher.findAll();
        })
        .then( teachers => {
            if( !teachers || teachers.length == 0 ) {
                return Teacher.bulkCreate([
                    { firstName: 'Jamal', lastName: 'Good', salary: '15000', indexNumber: '0001'},
                    { firstName: 'Carl', lastName: 'Master', salary: '10000', indexNumber: '0002'},
                    { firstName: 'John', lastName: 'Axe', salary: '12500', indexNumber: '0003'},
                ])
                    .then( () => {
                        return Teacher.findAll();
                    });
            } else {
                return teachers;
            }
        })
        .then( teachers => {
            allTeachers = teachers;
            return Grades.findAll();
        })
        .then( grades => {
            if( !grades || grades.length == 0 ) {
                return Grades.bulkCreate([
                    {idStudent: allStudents[0]._id, idTeacher: allTeachers[0]._id, grade: '5', subject: 'PE'},
                    {idStudent: allStudents[1]._id, idTeacher: allTeachers[1]._id, grade: '4', subject: 'MAD'},
                    {idStudent: allStudents[2]._id, idTeacher: allTeachers[2]._id, grade: '3', subject: 'ASD'},
                ]);
            } else {
                return grades;
            }
        });
};