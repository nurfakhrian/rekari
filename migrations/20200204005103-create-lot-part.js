'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lotparts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lotpartBarcode: {
        type: Sequelize.STRING(18),
        allowNull: false,
        unique: true
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      operatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'operators',
          key: 'id'
        },
      },
      typePartId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'typeparts',
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
    return queryInterface.dropTable('lotparts');
  }
};