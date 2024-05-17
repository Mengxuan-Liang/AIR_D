'use strict';
const { ReviewImage } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'url_image1'
    },
    {
      reviewId: 2,
      url: 'url_image2'
    },
    {
      reviewId: 3,
      url: 'url_image3'
    },
    {
      reviewId: 4,
      url: 'url_image1'
    },
    {
      reviewId: 5,
      url: 'url_image2'
    },
    {
      reviewId: 6,
      url: 'url_image3'
    },{
      reviewId: 7,
      url: 'url_image1'
    },
    {
      reviewId: 8,
      url: 'url_image2'
    },
    {
      reviewId: 9,
      url: 'url_image3'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
