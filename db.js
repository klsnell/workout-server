const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Password@localhost:5432/workout-log", {
    dialect: "postgres"
});


module.exports = sequelize;