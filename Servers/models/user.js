'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Character, { foreignKey:"userId" })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already taken"
      },
      validate: {
        notNull: {
          msg: "Email required"
        },
        notEmpty: {
          msg: "Email required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password required"
        },
        notEmpty: {
          msg: "Password required"
        },
        len: {
          args: 5,
          msg: "Password minimum 5 characters"
        }
      }
    },
    role: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password)
  })
  return User;
};