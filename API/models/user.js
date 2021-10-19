'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Quiz, { foreignKey: 'user_id' }); // A User has many Quizzes
      
      this.belongsToMany(models.Quiz, { through: models.Attempt, foreignKey:"user_id" }); // A User has many Attempts
    }
  };
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(["Admin", "Regular"])
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};