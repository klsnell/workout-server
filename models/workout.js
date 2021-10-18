const {DataTypes} = require('sequelize');
const db = require('../db');

const Workout = db.define('workout', {
    title: {
        type:DataTypes.STRING,
        allowNull: false
    },
    date:{
        type:DataTypes.STRING,
        allowNull: false
    },
    entry:{
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type:DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Workout