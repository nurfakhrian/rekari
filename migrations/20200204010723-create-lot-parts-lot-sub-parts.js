'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lotpartslotsubparts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lotSubPartCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subPartName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lotPartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lotparts',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lotpartslotsubparts');
  }
};