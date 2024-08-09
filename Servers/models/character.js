'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsTo(models.Game,{foreignKey: "gameId"})
      Character.belongsTo(models.User,{foreignKey: "userId"})
    }
  }
  Character.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    gameName: DataTypes.STRING,
    gameId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    skill: DataTypes.STRING,
    weapon: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};