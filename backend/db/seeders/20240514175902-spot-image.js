'use strict';
const { SpotImage } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: '/images_aird.png',
        preview: true
      },
      {
        spotId: 2,
        url:'/images_airdn.png',
        preview: true
      },
      {
        spotId: 3,
        url:'/images_airdnd.png',
        preview: true
      },
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
