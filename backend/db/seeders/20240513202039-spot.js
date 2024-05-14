'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 broadway st',
        city: 'Boston',
        state: 'ma',
        country: 'usa',
        lat: 42.03858,
        lng: -71.50590,
        name: 'Diamond Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 100.00
      },
      {
        ownerId: 2,
        address: '124 broadway st',
        city: 'Allston',
        state: 'ma',
        country: 'usa',
        lat: 42.03859,
        lng: -71.50592,
        name: 'Ocean Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 200.00
      },
      {
        ownerId: 3,
        address: '125 broadway st',
        city: 'South End',
        state: 'ma',
        country: 'usa',
        lat: 42.03851,
        lng: -71.50591,
        name: 'Sky Overhead',
        description: 'sleep in mountain views in our cozy hilltop cabin.',
        price: 300.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
