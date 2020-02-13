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
        model: 'lotlarts',
        key: 'id'
      },
    },
    subPartDetailtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subpartdetails',
        key: 'id'
      },
    },
  }, {});
  LotPartsLotSubParts.associate = function(models) {
    // associations can be defined here
  };
  return LotPartsLotSubParts;
};