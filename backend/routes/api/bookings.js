const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, Spotimage, ReviewImage, Spot} = require('../../db/models');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const spots = await Spot.findAll();
//     res.json(spots)
// })

// router.get('/spots/current', async(req, res) =>{
//     const spot = await Spot.findAll()
// })











module.exports = router;