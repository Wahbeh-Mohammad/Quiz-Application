'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attempt extends Model {
    static associate(models) {
      
    }
  };
  Attempt.init({
    attempt_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type:DataTypes.INTEGER
    },
    quiz_id: {
      type:DataTypes.INTEGER
    },
    Score: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Attempt',
    tableName:"attempts"
  });
  return Attempt;
};