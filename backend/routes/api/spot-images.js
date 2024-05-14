const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot} = require('../../db/models');

const router = express.Router();

router.get('/', async(req, res)=> {
    const info = await SpotImage.findAll()
    res.json(info)
})


module.exports = router;