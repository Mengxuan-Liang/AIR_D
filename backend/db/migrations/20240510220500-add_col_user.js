'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', { 
      type: Sequelize.STRING(30)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName')
  }
};
