'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('quizzes', {
      quiz_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey:true
      },
      quiz_name:{
        type: DataTypes.STRING,
        allowNull:false,    
      },
      category: {
        type: DataTypes.ENUM(["MATH", "PHYSICS", "GEOGRAPHY","MISC"]),
        allowNull:false,
        defaultValue:"MISC"
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
      },
      num_questions: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      marks: {
        type:DataTypes.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('quizzes');
  }
};