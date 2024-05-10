'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'lastName', { 
      type: Sequelize.STRING(30)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'lastName')
  }
};
