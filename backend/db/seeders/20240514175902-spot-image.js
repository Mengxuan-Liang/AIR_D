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
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368398/images_g4fwoi.jpg',
        preview: true
      },
      {
        spotId: 3,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368510/il_570xN.4864907940_irvh_utaz1p.avif',
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
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368714/pascale-weber-still-life-ai-dogs-animal-photographer-stillstars-001_oyv0nt.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368714/pascale-weber-still-life-ai-dogs-animal-photographer-stillstars-001_oyv0nt.jpg',
        preview: true
      },
      {
        spotId: 8,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 9,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 11,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 12,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 2,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 3,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 5,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 6,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 8,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 9,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 11,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
        preview: true
      },
      {
        spotId: 12,
        url:'https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368652/0H9fXk4lMC6xmLguo5OT--grid_cclpas.webp',
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
