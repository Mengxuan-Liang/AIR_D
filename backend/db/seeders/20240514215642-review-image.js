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
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/42c4fb6a-36ae-4ad2-9825-9d41a2e41d17_dlsf1b.jpg'
    },
    {
      reviewId: 2,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/4d274f35-819a-44c4-830c-e5e4f6fa5d80_ymlck6.jpg'
    },
    {
      reviewId: 3,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611476/9f278c86-83a6-4885-af7e-51174330b4d6_oyucez.jpg'
    },
    {
      reviewId: 4,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611476/1482f918-68ab-41eb-9740-4beff0b7943b_k8f18l.jpg'
    },
    {
      reviewId: 5,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611477/75760dd3-63c0-44b4-aec7-0d9e8d563b0f_azvxkw.jpg'
    },
    {
      reviewId: 6,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/95011637-010d-4776-9c59-f8d08ea26b23_fweyrc.jpg'
    },{
      reviewId: 7,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/d4aaf77c-b04f-40e9-80b4-47d8114eb61b_zw1vma.jpg'
    },
    {
      reviewId: 8,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/openart-image_LBoOQhNz_1721610485086_raw_ooy1w7.jpg'
    },
    {
      reviewId: 9,
      url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/openart-image_LBoOQhNz_1721610485086_raw_ooy1w7.jpg'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
