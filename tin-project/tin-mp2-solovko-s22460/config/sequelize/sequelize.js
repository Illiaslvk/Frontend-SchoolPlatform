const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-example-sequelize-2', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;