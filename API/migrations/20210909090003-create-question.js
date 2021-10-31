'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('questions', {
      question_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      quiz_id:{
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
        type: DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('questions');
  }
};