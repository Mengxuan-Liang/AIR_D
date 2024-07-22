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
        name: 'Furry Friends',
        description: 'Wake up to breathtaking mountain views in our cozy hilltop cabin.',
        price: 100.00
      },
      {
        ownerId: 1,
        address: '123 Main St',
  city: 'San Francisco',
  state: 'CA',
  country: 'US',
  lat: 37.774929,
  lng: -122.419416,
  name: 'Bark Avenue',
  description: 'Enjoy the urban lifestyle in our chic downtown apartment.',
  price: 150.00
      },
      {
        ownerId: 1,
        address: '456 Elm St',
  city: 'Chicago',
  state: 'IL',
  country: 'US',
  lat: 41.878114,
  lng: -87.629798,
  name: 'Pet Paradise',
  description: 'Experience the best of Chicago from our centrally located loft.',
  price: 120.00
      },
      {
        ownerId: 1,
        address: '789 Oak St',
  city: 'Denver',
  state: 'CO',
  country: 'US',
  lat: 39.739236,
  lng: -104.990251,
  name: 'Mountain Escape',
  description: 'Relax in our serene mountain cabin with stunning views.',
  price: 200.00
      },
      {
        ownerId: 2,
        address: '101 Pine St',
  city: 'Seattle',
  state: 'WA',
  country: 'US',
  lat: 47.606209,
  lng: -122.332071,
  name: 'Emerald City Nest',
  description: 'Stay in the heart of Seattle with easy access to all attractions.',
  price: 140.00
      },
      {
        ownerId: 2,
        address: '202 Birch St',
  city: 'Austin',
  state: 'TX',
  country: 'US',
  lat: 30.267153,
  lng: -97.743061,
  name: 'Tail Waggers',
  description: 'Discover the live music capital of the world from our cozy loft.',
  price: 110.00
      },
      {
        ownerId: 2,
        address: '303 Cedar St',
  city: 'Miami',
  state: 'FL',
  country: 'US',
  lat: 25.761680,
  lng: -80.191790,
  name: 'Pawsome Retreat',
  description: 'Enjoy the sun and sand in our beachfront condo.',
  price: 180.00
      },
      {
        ownerId: 2,
        address: '404 Maple St',
  city: 'New York',
  state: 'NY',
  country: 'US',
  lat: 40.712776,
  lng: -74.005974,
  name: 'Big Apple Hideaway',
  description: 'Stay in the heart of NYC with all the city has to offer.',
  price: 250.00
      },
      {
        ownerId: 3,
        address: '505 Willow St',
  city: 'Los Angeles',
  state: 'CA',
  country: 'US',
  lat: 34.052235,
  lng: -118.243683,
  name: 'Hollywood Haven',
  description: 'Experience the glamour of Hollywood from our stylish apartment.',
  price: 220.00
      },
      {
        ownerId: 3,
        address: '606 Aspen St',
  city: 'Portland',
  state: 'OR',
  country: 'US',
  lat: 45.515458,
  lng: -122.679346,
  name: 'Rose City Retreat',
  description: 'Relax in our charming Portland bungalow with a beautiful garden.',
  price: 130.00
      },
      {
        ownerId: 3,
        address: '808 Cypress St',
        city: 'San Diego',
        state: 'CA',
        country: 'US',
        lat: 32.715738,
        lng: -117.161084,
        name: 'Seaside Sanctuary',
        description: 'Unwind in our peaceful seaside home with ocean views.',
        price: 190.00
      },
      {
        ownerId: 3,
        address: '909 Redwood St',
  city: 'Boston',
  state: 'MA',
  country: 'US',
  lat: 42.360082,
  lng: -71.058880,
  name: 'Doggie Dreamland',
  description: 'Explore historic Boston from our cozy and convenient apartment.',
  price: 160.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
