module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    content: DataTypes.STRING,
    header: DataTypes.STRING,
    picture: DataTypes.STRING,
    tags: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  News.associate = function (models) {
    News.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
  };
  return News;
};
