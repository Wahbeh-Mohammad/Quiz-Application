'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('quizzes', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_id_fkey',
      references: { table: 'users', field: 'user_id' } ,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('attempts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'attempts_user_id_fkey',
      references: { table: 'users', field: 'user_id' } ,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('quizzes', 'user_id_fkey');
    await queryInterface.removeConstraint('attempts', 'attempts_user_id_fkey');
  }
};
