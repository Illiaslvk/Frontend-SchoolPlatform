const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Student = sequelize.define('Student', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pesel: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            customValidator(pesel) {
                if (pesel === undefined) {
                    throw new Error("Undefined PESEL")
                }else if (!checkSymbols(pesel)){
                    throw new Error("The field should contain numbers")
                } else  if (pesel.toString().length !== 11 && pesel.toString().length !== 0) {
                    throw new Error("The field should be an empty or contain 11 digits")
                } if (pesel.toString().length === 0 || pesel.toString().length === 11) {
                    return true;
                }
            },
        },
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [3,50],
                msg: "The field should contain between 3 and 50 characters"
            },
            isEmail: {
                msg: "The field should contain a valid email address"
            }
        }
    }
});
function checkSymbols(pesel) {
    pesel = pesel.toString().trim();
    const reb = /^[0-9 -]*$/;

    return reb.test(pesel);
}
module.exports = Student;