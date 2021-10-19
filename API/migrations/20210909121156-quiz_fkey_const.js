'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('questions', {
      fields: ['quiz_id'],
      type: 'foreign key',
      name: 'quiz_id_fkey',
      references: { table: 'quizzes', field: 'quiz_id' } ,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('attempts', {
      fields: ['quiz_id'],
      type: 'foreign key',
      name: 'attempts_quiz_id_fkey',
      references: { table: 'quizzes', field: 'quiz_id' } ,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('questions', 'quiz_id_fkey');
    await queryInterface.removeConstraint('attempts', 'attempts_quiz_id_fkey');
  }
};
