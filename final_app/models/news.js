'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    content: DataTypes.STRING,
    header: DataTypes.STRING,
    picture: DataTypes.STRING,
    tags:DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
    }
  }, {});
  News.associate = function(models) {
    // associations can be defined here
    News.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'})
  };
  return News;
};