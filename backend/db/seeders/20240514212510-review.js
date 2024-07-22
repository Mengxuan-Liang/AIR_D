'use strict';
const { Review } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3,
        review: 'Absolutely loved staying here! The views were incredible and the cabin was very cozy.',
        stars: 5
      },{
        spotId: 9,
        userId: 1,
        review: 'Great location and comfortable stay. Would definitely come back.',
        stars: 1
      },
      {
        spotId: 8,
        userId: 3,
        review: 'Fantastic experience! The host was very accommodating and the cabin was perfect.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Beautiful location and well-maintained cabin. Highly recommend.',
        stars: 3
      },
      {
        spotId: 4,
        userId: 1,
        review: 'The cabin was nice, but the cleanliness could have been better.',
        stars: 1
      },
      {
        spotId: 4,
        userId: 2,
        review: 'A wonderful getaway! The mountain views were stunning.',
        stars: 4
      },{
        spotId: 4,
        userId: 3,
        review: 'Great place to relax and unwind. Very peaceful and quiet.',
        stars: 3
      },{
        spotId: 5,
        userId:1,
        review: 'The cabin was nice, but the amenities were a bit lacking.',
        stars: 2
      },
      {
        spotId: 5,
        userId: 2,
        review: 'The location was good, but the cabin needed some maintenance.',
        stars: 2
      },{
        spotId: 5,
        userId: 3,
        review: 'One of the best stays we have had! The cabin was clean and well-equipped.',
        stars: 5
      },
      {
        spotId: 6,
        userId:1,
        review: 'Nice cabin with beautiful views. Had a great time.',
        stars: 3
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Amazing experience! The host was very friendly and helpful.',
        stars: 5
      },{
        spotId: 6,
        userId: 3,
        review: 'Lovely cabin with a great location. Would stay again.',
        stars: 5
      },
      {
        spotId: 7,
        userId:1,
        review: 'Good stay overall, but the bed was a bit uncomfortable.',
        stars: 2
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Decent stay, but the cabin could use some updates.',
        stars: 4
      },{
        spotId: 7,
        userId: 3,
        review: 'Exceeded our expectations! The views were breathtaking.',
        stars: 5
      },
      {
        spotId: 8,
        userId:1,
        review: 'Fantastic place! The cabin was clean and the views were amazing.',
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: 'this palce is great',
        stars: 2
      },{
        spotId: 8,
        userId: 3,
        review: 'this is the best place ever',
        stars: 5
      },
      {
        spotId: 9,
        userId:1,
        review: 'Great experience overall. The host was very responsive.',
        stars: 4
      },
      {
        spotId: 9,
        userId: 2,
        review:'The cabin was okay, but there were some issues with the heating.',
        stars: 2
      },{
        spotId: 9,
        userId: 3,
        review: 'An unforgettable stay! The cabin was perfect and the views were stunning.',
        stars: 5
      },
      {
        spotId: 10,
        userId:1,
        review: 'The cabin was okay, but the road to get there was very rough.',
        stars: 2
      },
      {
        spotId: 10,
        userId: 2,
        review: 'Great spot for a weekend getaway. Very peaceful and comfortable.',
        stars: 4
      },{
        spotId: 10,
        userId: 3,
        review: 'Could not have asked for a better place to stay! Highly recommend.',
        stars: 5
      },
      {
        spotId: 11,
        userId:1,
        review: 'Overall a good stay, but the cabin was a bit smaller than expected.',
        stars: 2
      },
      {
        spotId: 11,
        userId: 2,
        review: 'Lovely cabin with beautiful surroundings. Had a great time.',
        stars: 4
      },{
        spotId:11,
        userId: 3,
        review: 'Perfect retreat! The host was very welcoming and the place was spotless.',
        stars: 5
      },
      {
        spotId: 12,
        userId:1,
        review: 'The cabin was nice, but the internet connection was quite slow.',
        stars: 4
      },
      {
        spotId: 12,
        userId: 2,
        review: 'Really enjoyed our stay. The location was perfect for a quiet getaway.',
        stars: 4
      },{
        spotId: 12,
        userId: 3,
        review: 'This place was amazing! The cabin was cozy and the views were incredible.',
        stars: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
