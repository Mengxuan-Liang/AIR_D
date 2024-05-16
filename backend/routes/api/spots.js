const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot } = require('../../db/models');
const { where } = require('sequelize');

const router = express.Router();

//helper function to get avgRating
async function avgRating(spot) {
    const spotArr = spot;
    for (let i = 0; i < spotArr.length; i++) {
        let oneSpot = spotArr[i];
        const reviews = await Review.findAll({
            where: { spotId: oneSpot.id }
        });
        const stars = reviews.reduce((accu, curr) => {
            return accu + curr.stars
        }, 0);
        oneSpot.dataValues.avgRating = stars / reviews.length;
    }
}

//helper function to get reviewImage url
async function previewImage(spot) {
    const spotArr = spot;
    for (let i = 0; i < spotArr.length; i++) {
        let oneSpot = spotArr[i];
        const spotImg = await SpotImage.findAll({
            attributes: ['url'],
            where: { spotId: oneSpot.id }
        });
        oneSpot.dataValues.previewImage = spotImg[0].url;
    }
}

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    await avgRating(spots);
    await previewImage(spots);
    res.json({ Spot: spots })
})


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId: userId }
    }
    );
    await avgRating(spots);
    await previewImage(spots);
    res.json({ Spot: spots })
})

//helper function to get numReviews for:Get details for a Spot from an id

async function numReviews(spotId) {
    const review = await Review.findAll({
        where: {
            spotId: spotId
        }
    });
    return review.length;
}

//Get details for a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    const totalSpot = await Spot.findAll();
    const length = totalSpot.length;
    const spotInfo = await Spot.findAll({
        where: { id: spotId },
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User, as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
    });
    const num = await numReviews(spotId)
    if (spotId > length) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    spotInfo[0].dataValues.numReviews = num;
    await avgRating(spotInfo);
    res.json(spotInfo)


})

//Create a Spot
router.post('/', requireAuth, async (req, res) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
    const err = new Error('Bad Request');
    err.status = 400;
    err.errors = {};
    console.log(address.length)
    if (!address || address.trim() === '') {
        let msg = "Street address is required";
        err.errors.address = msg
    }
    if (!name || name.length > 50 || name.trim() === '') {
        let msg = "Name must be less than 50 characters";
        err.errors.name = msg
    }
    if (!city || city.trim() === '') {
        let msg = "City is required";
        err.errors.city = msg
    }
    if (!state || state.trim() === '') {
        let msg = "State is required";
        err.errors.state = msg
    }
    if (!country || country.trim() === '') {
        let msg = "Country is required";
        err.errors.country = msg
    }
    if (lat < -90 || lat > 90 || !lat || lat.toString().trim() === '') {
        let msg = "Latitude must be with -90 and 90";
        err.errors.lat = msg
    }
    if (lng < -180 || lng > 180 || !lng || lng.toString().trim() === '') {
        let msg = "Longitude must be with -180 and 180";
        err.errors.lng = msg
    }
    if (!description || description.trim() === '') {
        let msg = "Description is required";
        err.errors.description = msg
    }
    if (price < 0 || !price || price.toString().trim() === '') {
        let msg = "Price per day must be a positive number";
        err.errors.price = msg
    }
    if ((Object.keys(err.errors)).length) throw err;


    const newSpot = await Spot
        .create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
    // await Spot.save();
    res.status(201).json(newSpot)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const currentSpot = await Spot.findByPk(spotId);

    // check if the spotId is less than the total spots of the logged in user
    const totalSpot = await Spot.findAll({
        // where: {ownerId: userId}
    });
    const length = totalSpot.length;

    if (spotId > length) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    // check if the current user is the logged in user
    const currentOwner = currentSpot.ownerId;
    if (userId === currentOwner) {

        const { url, preview } = req.body;
        const img = await SpotImage.create({
            where: { spotId: spotId },
            url,
            preview
        });
        res.json(img)
    } else {
        res.json({ message: "you are not the owner, you can not add an image for this spot" })
    }
})




// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
    const err = new Error('Bad Request');
    err.status = 400;
    err.errors = {};
    if (!address) {
        let msg = "Street address is required";
        err.errors.address = msg
    }
    if (!name || name.length > 50) {
        let msg = "Name must be less than 50 characters";
        err.errors.name = msg
    }
    if (!city) {
        let msg = "City is required";
        err.errors.city = msg
    }
    if (!state) {
        let msg = "State is required";
        err.errors.state = msg
    }
    if (!country) {
        let msg = "Country is required";
        err.errors.country = msg
    }
    if (lat < -90 || lat > 90 || !lat) {
        let msg = "Latitude must be with -90 and 90";
        err.errors.lat = msg
    }
    if (lng < -180 || lng > 180 || !lng) {
        let msg = "Longitude must be with -180 and 180";
        err.errors.lng = msg
    }
    if (!description) {
        let msg = "Description is required";
        err.errors.description = msg
    }
    if (price < 0 || !price) {
        let msg = "Price per day must be a positive number";
        err.errors.price = msg
    }
    if ((Object.values(err.errors)).length) throw err;

    const spotId = req.params.spotId;
    // check if the current user is the logged in user
    const currentSpot = await Spot.findByPk(spotId);
    // check if the spotId is less than the total spots of the logged in user
    const totalSpot = await Spot.findAll({
        // where: {ownerId: userId}
    });
    const length = totalSpot.length;

    if (spotId > length) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    const currentOwner = currentSpot.ownerId;
    const userId = req.user.id;
    if (userId === currentOwner) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        if (address !== undefined) currentSpot.address = address;
        if (city !== undefined) currentSpot.city = city;
        if (state !== undefined) currentSpot.state = state;
        if (country !== undefined) currentSpot.country = country;
        if (lat !== undefined) currentSpot.lat = lat;
        if (lng !== undefined) currentSpot.lng = lng;
        if (name !== undefined) currentSpot.name = name;
        if (description !== undefined) currentSpot.description = description;
        if (price !== undefined) currentSpot.price = price;

        await currentSpot.save();
        res.json(currentSpot);
    } else {
        res.status(400)
        res.json({ message: "you are not the owner, you can not delete this spot" })
    }
})


// Delete a Spot

router.delete('/:spotId', requireAuth, async (req, res) => {
    
    const spotId = req.params.spotId;

    // check if the current user is the logged in user
    const currentSpot = await Spot.findByPk(spotId);
    if (!currentSpot) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    const currentOwner = currentSpot.ownerId;
    const userId = req.user.id;
    if (userId === currentOwner) {

        await currentSpot.destroy();
        res.status(200);
        res.json({ message: "Successfully deleted" })

    } else {
        res.json({ message: "you are not the owner, you can not add an image for this spot" })
    }
})








module.exports = router;

