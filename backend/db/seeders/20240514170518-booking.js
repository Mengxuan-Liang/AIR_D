'use strict';
const { Booking } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-01-01',
        endDate: '2024-05-05'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-03-01',
        endDate: '2024-06-05'
      },{
        spotId: 3,
        userId: 3,
        startDate: '2024-02-01',
        endDate: '2024-07-05'
      },
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
