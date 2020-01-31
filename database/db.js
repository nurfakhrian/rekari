const Sequelize = require('sequelize');
const sequelize = new Sequelize('rekari', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;