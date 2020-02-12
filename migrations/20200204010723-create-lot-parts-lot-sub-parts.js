'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LotPartsLotSubParts', {
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
      lotPartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'LotParts',
          key: 'id'
        },
      },
      subPartDetailtId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SubPartDetails',
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
    return queryInterface.dropTable('LotPartsLotSubParts');
  }
};