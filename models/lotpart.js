'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotPart = sequelize.define('LotPart', {
    lotpartBarcode: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    operatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'operators',
        key: 'id'
      },
    },
    typePartId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'typeparts',
        key: 'id'
      },
    },
  }, {});
  LotPart.associate = function(models) {
    LotPart.belongsTo(models.Operator, {
      foreignKey: 'operatorId',
      targetKey: 'id',
      as: 'operator',
      onDelete: 'SET NULL'
    });
    LotPart.belongsTo(models.TypePart, {
      foreignKey: 'typePartId',
      targetKey: 'id',
      as: 'typePart',
      onDelete: 'SET NULL'
    });
    LotPart.hasMany(models.LotPartsLotSubPart, {
      foreignKey: 'lotPartId',
      sourceKey: 'id',
      as: 'lotPartsLotSubParts'
    });
  };
  return LotPart;
};