'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Question.init({
    question_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    quiz_id: {
      type:DataTypes.INTEGER
    },
    prompt: {
      type: DataTypes.STRING,
      allowNull:false
    },
    answer1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer3: {
      type: DataTypes.STRING
    },
    answer4: {
      type: DataTypes.STRING,
    },
    correct_answer: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName:"questions"
  });
  return Question;
};