'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operator = sequelize.define('Operator', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Operator.associate = function(models) {
    // associations can be defined here
  };
  return Operator;
};