'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotPartsLotSubParts = sequelize.define('LotPartsLotSubParts', {
    lotSubPartCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lotPartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LotParts',
        key: 'id'
      },
    },
    SubPartDetailtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SubPartDetails',
        key: 'id'
      },
    },
  }, {});
  LotPartsLotSubParts.associate = function(models) {
    // associations can be defined here
  };
  return LotPartsLotSubParts;
};