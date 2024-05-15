const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot} = require('../../db/models');
const { where } = require('sequelize');

const router = express.Router();

//helper function to get avgRating
async function avgRating(spot){
    const spotArr = spot;
    for(let i = 0; i < spotArr.length; i++){
        let oneSpot = spotArr[i];
        const reviews = await Review.findAll({
            where: {spotId: oneSpot.id}
        });
        const stars = reviews.reduce((accu, curr)=>{
            return accu + curr.stars
        }, 0);
        oneSpot.dataValues.avgRating = stars / reviews.length;
    }
}

//helper function to get reviewImage url
async function previewImage(spot){
    const spotArr = spot;
    for(let i = 0; i < spotArr.length; i++){
        let oneSpot = spotArr[i];
        const spotImg = await SpotImage.findAll({
            attributes: ['url'],
            where: {spotId: oneSpot.id}
        });
        console.log(spotImg)
        oneSpot.dataValues.previewImage = spotImg[0].url;
    }
}

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    await avgRating(spots);
    await previewImage(spots);
    res.json({Spot: spots})
})

router.get('/spots/current', async(req, res) =>{
    const spot = await Spot.findAll()
})


module.exports = router;

