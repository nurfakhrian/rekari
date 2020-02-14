'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubPartDetail = sequelize.define('SubPartDetail', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    typePartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'typeparts',
        key: 'id'
      },
    },
  }, {});
  SubPartDetail.associate = function(models) {
    SubPartDetail.belongsTo(models.TypePart, {
      foreignKey: 'typePartId',
      targetKey: 'id',
      as: 'typePart',
      onDelete: 'CASCADE'
    });
  };
  return SubPartDetail;
};