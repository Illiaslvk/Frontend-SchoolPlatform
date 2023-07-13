const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Teacher = sequelize.define('Teacher', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [3,20],
                msg: "The field should contain between 3 and 20 characters"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [3,20],
                msg: "The field should contain between 3 and 20 characters"
            },
        }
    },
    salary: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [2,20],
                msg: "The field should contain between 2 and 20 digits"
            },
        }
    },
    indexNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [2,20],
                msg: "The field should contain between 2 and 20 digits"
            },
        }
    }
});

module.exports = Teacher;