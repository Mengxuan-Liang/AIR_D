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
        address: '1 broadway st',
        city: 'Boston',
        state: 'MA',
        country: 'US',
        lat: 42.038118858,
        lng: -71.508575590,
        name: 'My Space',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 100.00
      },
      {
        ownerId: 1,
        address: '11 broadway st',
        city: 'Boston',
        state: 'MA',
        country: 'US',
        lat: 42.0385835353435,
        lng: -71.50590353,
        name: 'Diamond Overhead',
        description: 'This is a good place to stay.',
        price: 200.00
      }, 
      {
        ownerId: 1,
        address: '123 broadway st',
        city: 'Boston',
        state: 'MA',
        country: 'US',
        lat: 42.03800058,
        lng: -71.500000590,
        name: 'Diamond Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 100.00
      },
      {
        ownerId: 1,
        address: '111 broadway st',
        city: 'Boston',
        state: 'MA',
        country: 'US',
        lat: 42.0385845353545,
        lng: -71.5059353450234,
        name: 'Diamond head',
        description: 'Cool place.',
        price: 300.00
      },
      {
        ownerId: 2,
        address: '124 broadway st',
        city: 'Allston',
        state: 'MA',
        country: 'US',
        lat: 42.0385935343711,
        lng: -71.50146341592,
        name: 'Ocean Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 100.00
      },
      {
        ownerId: 2,
        address: '2 broadway st',
        city: 'Allston',
        state: 'MA',
        country: 'US',
        lat: 42.0385936345311,
        lng: -71.501134534531592,
        name: 'Ocean Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 200.00
      },
      {
        ownerId: 2,
        address: '22 broadway st',
        city: 'Allston',
        state: 'MA',
        country: 'US',
        lat: 42.038535353911,
        lng: -71.501115353592,
        name: 'Ocean Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 300.00
      },
      {
        ownerId: 2,
        address: '124 broadway st',
        city: 'Allston',
        state: 'MA',
        country: 'US',
        lat: 42.0385119,
        lng: -71.50111592,
        name: 'Ocean Overhead',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 200.00
      },
      {
        ownerId: 3,
        address: '125 broadway st',
        city: 'South End',
        state: 'MA',
        country: 'US',
        lat: 42.0381446151,
        lng: -71.543646220591,
        name: 'Sky Overhead',
        description: 'sleep in mountain views in our cozy hilltop cabin.',
        price: 300.00
      },
      {
        ownerId: 3,
        address: '33 broadway st',
        city: 'South End',
        state: 'MA',
        country: 'US',
        lat: 42.03666681151,
        lng: -71.5266620591,
        name: 'Sky Overhead',
        description: 'sleep in mountain views in our cozy hilltop cabin.',
        price: 300.00
      },
      {
        ownerId: 3,
        address: '333 broadway st',
        city: 'South End',
        state: 'MA',
        country: 'US',
        lat: 42.03815555151,
        lng: -71.5225550591,
        name: 'Sky Overhead',
        description: 'sleep in mountain views in our cozy hilltop cabin.',
        price: 300.00
      },
      {
        ownerId: 3,
        address: '125 broadway st',
        city: 'South End',
        state: 'MA',
        country: 'US',
        lat: 42.03666851,
        lng: -71.566666660591,
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
