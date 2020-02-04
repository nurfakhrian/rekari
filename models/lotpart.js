'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotPart = sequelize.define('LotPart', {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    operatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Operators',
        key: 'id'
      },
    },
    typePartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TypeParts',
        key: 'id'
      },
    },
  }, {});
  LotPart.associate = function(models) {
    // associations can be defined here
  };
  return LotPart;
};