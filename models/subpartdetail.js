'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubPartDetail = sequelize.define('SubPartDetail', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {});
  SubPartDetail.associate = function(models) {
    // associations can be defined here
  };
  return SubPartDetail;
};