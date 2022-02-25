const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    login: DataTypes.STRING,
  }, {});
  Users.associate = function (models) {
    Users.hasMany(models.News, {
      foreignKey: 'user_id',
      as: 'news',
    });
  };
  return Users;
};
