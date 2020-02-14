'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypePart = sequelize.define('TypePart', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    section: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nSubPart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  TypePart.associate = function(models) {
    TypePart.hasMany(models.SubPartDetail, {
      foreignKey: 'typePartId',
      sourceKey: 'id',
      as: 'subParts'
    });
    TypePart.hasMany(models.LotPart, {
      foreignKey: 'typePartId',
      sourceKey: 'id',
      as: 'lotParts'
    });
  };
  return TypePart;
};