'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('attempts', {
      attempt_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      quiz_id: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      Score: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
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
    await queryInterface.dropTable('attempts');
  }
};