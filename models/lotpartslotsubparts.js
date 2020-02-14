'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotPartsLotSubParts = sequelize.define('LotPartsLotSubPart', {
    lotSubPartCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subPartName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lotPartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lotparts',
        key: 'id'
      },
    }
  }, {});
  LotPartsLotSubParts.associate = function(models) {
    LotPartsLotSubParts.belongsTo(models.LotPart, {
      foreignKey: 'lotPartId',
      targetKey: 'id',
      as: 'lotPart',
      onDelete: 'CASCADE'
    });
  };
  return LotPartsLotSubParts;
};