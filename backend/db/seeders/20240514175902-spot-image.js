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
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717269282/816212804889b08e4d1fc957512dc5f7_r5oqyk.jpg',
        preview: true
      },
      {
        spotId: 2,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611481/openart-image_RbdUbDky_1721610753569_raw_rvl6pb.jpg',
        preview: true
      },
      {
        spotId: 3,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/d4aaf77c-b04f-40e9-80b4-47d8114eb61b_zw1vma.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368587/dog_house_by_ai_visions_dgmjcu1-pre_uyxfv8.jpg',
        preview: true
      },
      {
        spotId: 5,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 6,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611481/debe2abe-f44d-4650-8dfb-89c1e35e93d4_psqora.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/462249a5-2099-4c51-879a-8fdd0ef4b612_ynxsnd.jpg',
        preview: true
      },
      {
        spotId: 8,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/openart-image_LBoOQhNz_1721610485086_raw_ooy1w7.jpg',
        preview: true
      },
      {
        spotId: 9,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/76009f03-c6ca-4f67-b5b4-a931a842c359_tjetup.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/42c4fb6a-36ae-4ad2-9825-9d41a2e41d17_dlsf1b.jpg',
        preview: true
      },
      {
        spotId: 11,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/4d274f35-819a-44c4-830c-e5e4f6fa5d80_ymlck6.jpg',
        preview: true
      },
      {
        spotId: 12,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/77811395-b4df-49b0-a797-9cc062848cdf_parhhh.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/4d274f35-819a-44c4-830c-e5e4f6fa5d80_ymlck6.jpg',
        preview: true
      },
      {
        spotId: 2,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611476/39cffa08-0bdf-4c5f-ae48-a55d2234e473_onfdq2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611476/1482f918-68ab-41eb-9740-4beff0b7943b_k8f18l.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/77811395-b4df-49b0-a797-9cc062848cdf_parhhh.jpg',
        preview: true
      },
      {
        spotId: 5,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/77811395-b4df-49b0-a797-9cc062848cdf_parhhh.jpg',
        preview: true
      },
      {
        spotId: 6,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/d4aaf77c-b04f-40e9-80b4-47d8114eb61b_zw1vma.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/d4aaf77c-b04f-40e9-80b4-47d8114eb61b_zw1vma.jpg',
        preview: true
      },
      {
        spotId: 8,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/openart-image_LBoOQhNz_1721610485086_raw_ooy1w7.jpg',
        preview: true
      },
      {
        spotId: 9,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611481/openart-image_RbdUbDky_1721610753569_raw_rvl6pb.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368587/dog_house_by_ai_visions_dgmjcu1-pre_uyxfv8.jpg',
        preview: true
      },
      {
        spotId: 11,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/42c4fb6a-36ae-4ad2-9825-9d41a2e41d17_dlsf1b.jpg',
        preview: true
      },
      {
        spotId: 12,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/77811395-b4df-49b0-a797-9cc062848cdf_parhhh.jpg',
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
