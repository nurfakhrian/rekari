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
    // associations can be defined here
  };
  return TypePart;
};