const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot } = require('../../db/models');
const { where, Op } = require('sequelize');

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
        if(spotImg.length>0){
            oneSpot.dataValues.previewImage = spotImg[0].url;
        }else {
            oneSpot.dataValues.previewImage = null;
        }
    }
}

//get all spots-----------------------------------------------------------------------------------
// Add Query Filters to Get All Spots ------------------------------------------------------
router.get('/', async(req, res, next)=> {
    const {
        page = 1,
        size = 20,
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice
    } = req.query;

    // Validate query parameters
    const errors = {};

    if (page < 1 || page > 10) errors.page = "Page must be between 1 and 10";
    if (size < 1 || size > 20) errors.size = "Size must be between 1 and 20";
    if (minLat && isNaN(parseFloat(minLat))) errors.minLat = "Minimum latitude is invalid";
    if (maxLat && isNaN(parseFloat(maxLat))) errors.maxLat = "Maximum latitude is invalid";
    if (minLng && isNaN(parseFloat(minLng))) errors.minLng = "Minimum longitude is invalid";
    if (maxLng && isNaN(parseFloat(maxLng))) errors.maxLng = "Maximum longitude is invalid";
    if (minPrice && (isNaN(parseFloat(minPrice)) || parseFloat(minPrice) < 0)) errors.minPrice = "Minimum price must be greater than or equal to 0";
    if (maxPrice && (isNaN(parseFloat(maxPrice)) || parseFloat(maxPrice) < 0)) errors.maxPrice = "Maximum price must be greater than or equal to 0";

    if (Object.keys(errors).length) {
        return res.status(400).json({
            message: "Bad Request",
            errors
        });
    }

    // Construct filters
    const filters = {};
    if (minLat) filters.lat = { [Op.gte]: parseFloat(minLat) };
    if (maxLat) filters.lat = { ...filters.lat, [Op.lte]: parseFloat(maxLat) };
    if (minLng) filters.lng = { [Op.gte]: parseFloat(minLng) };
    if (maxLng) filters.lng = { ...filters.lng, [Op.lte]: parseFloat(maxLng) };
    if (minPrice) filters.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, [Op.lte]: parseFloat(maxPrice) };

    // Pagination
    let limit = parseInt(size);
    let offset = parseInt(page);

    // Query spots with filters and pagination
    const spots = await Spot.findAll({
        where: filters,
        limit: size,
        offset: size * (page - 1)
    });
    await avgRating(spots);
    await previewImage(spots);

    // Format response
    const response = {
        Spots: spots,
        page,
        size
    };
    res.status(200).json(response);
})
// router.get('/', async (req, res) => {
//     const spots = await Spot.findAll();
//     await avgRating(spots);
//     await previewImage(spots);
//     res.json({ Spot: spots })
// })


//Get all Spots owned by the Current User---------------------------------------------------------
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

//Get details for a Spot from an id---------------------------------------------------------------
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    // check if the spotId exists
    const totalSpot = await Spot.findAll();
    const existingSpot = totalSpot.find(spot => spot.id === +spotId);
    if(!existingSpot){
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    // const length = totalSpot.length;
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
    // if (spotId > length || spotId <= 0) {
    //     res.status(404);
    //     return res.json({ "message": "Spot couldn't be found" })
    // }
    spotInfo[0].dataValues.numReviews = num;
    await avgRating(spotInfo);
    res.json(spotInfo)


})

//Create a Spot------------------------------------------------------------------------------------
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
    const err = new Error('Bad Request');
    err.status = 400;
    err.errors = {};
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
            ownerId: ownerId,
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

// Add an Image to a Spot based on the Spot's id-----------------------------------------------------------------
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const currentSpot = await Spot.findByPk(spotId);

    // check if the spotId is less than the total spots of the logged in user
    const totalSpot = await Spot.findAll({
        // where: {ownerId: userId}
    });
    // const length = totalSpot.length;

    if (currentSpot === null || spotId <= 0) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    // check if the current user is the logged in user
    const currentOwner = currentSpot.ownerId;
    if (userId === currentOwner) {

        const { url, preview } = req.body;
        const img = await SpotImage.create({
            spotId: +spotId,
            url,
            preview
        });
        res.json(img)
    } else {
        res.status(403).json({ message: "you are not the owner, you can not add an image for this spot" })
    }
})


// Edit a Spot-------------------------------------------------------------------
router.put('/:spotId', requireAuth, async (req, res) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
    const err = new Error('Bad Request');
    err.status = 400;
    err.errors = {};
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
    if ((Object.values(err.errors)).length) throw err;

    const spotId = req.params.spotId;
    // check if the current user is the logged in user
    const currentSpot = await Spot.findByPk(spotId);
    // check if the spotId is less than the total spots of the logged in user
    const totalSpot = await Spot.findAll({
        // where: {ownerId: userId}
    });
    // const length = totalSpot.length;

    // if (spotId > length || spotId <= 0) {
    if (!spotId || spotId <= 0) {
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
        res.json({ message: "You are not the owner, you can not edit this spot" })
    }
})


// Delete a Spot---------------------------------------------------------------------------------------------------

router.delete('/:spotId', requireAuth, async (req, res) => {

    const spotId = req.params.spotId;

    // check if the current user is the owner
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
        res.status(400)
        res.json({ message: "You are not the owner, you can not add an image for this spot" })
    }
})


// Get all Reviews by a Spot's id-------------------------------------------------------------------------------------
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    // check if the spotId is less than the total spots of the logged in user
    const totalSpot = await Spot.findAll();
    const length = totalSpot.length;

    if (spotId > length || spotId <= 0) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    res.status(200).json({ Reviews: reviews })
})

// Create a Review for a Spot based on the Spot's id--------------------------------------------------------------------
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId; // the current spot
    const userId = req.user.id // the current user
    const { review, stars } = req.body;

    // error handling:
    //set error message object and status code
    const err = new Error('Bad Request');
    err.status = 400;
    err.errors = {};
    // check if the spotId is less than the total spots of the logged in user
    const totalSpot = await Spot.findAll();
    const length = totalSpot.length;
    if (spotId > length || spotId <= 0) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    // check if the user input review and star
    if (!review || review.trim() === '') {
        let msg = "Review text is required";
        err.errors.review = msg
    }
    if (!stars || stars < 1 || stars > 5 || stars.toString().trim() === '') {
        let msg = "Stars must be an integer from 1 to 5";
        err.errors.stars = msg
    }
    // if the error obj is not empty, throw the error
    if ((Object.values(err.errors)).length) throw err;

    //check if the current user already made a review for this spot
    const reviewsArrBelongsToCurrSopt = await Review.findAll({
        where: { spotId: spotId }
    });
    for (let i = 0; i < reviewsArrBelongsToCurrSopt.length; i++) {
        let userIdInCurrReviews = reviewsArrBelongsToCurrSopt[i].userId;
        if (userIdInCurrReviews === userId) {
            let msg = "You already made a review for this spot";
            err.errors.reviewed = msg
            res.status(500).json(msg)
        }
    }
    // if no error create the review
    const newReview = await Review.create({
        review,
        stars,
        spotId: +spotId,
        userId: userId
    })
    res.status(201).json(newReview)
})

// Get all bookings for a spot based on the spot's id ------------------------
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    // check if the spot can be found in the Spot
    const currentSpot = await Spot.findByPk(spotId);
    if (!currentSpot) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    // check if the current user is the spot's owner
    const currentOwner = currentSpot.ownerId;
    const userId = req.user.id;
    if (userId === currentOwner) {
        const booking = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });
        res.json({ Bookings: booking })
    } else {
        const booking = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'userId']
            }
        });
        res.json({ Bookings: booking })
    }
})

// Create a Booking from a Spot based on the Spot's id---------------------------------
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    // check if the spot can be found in the Spot
    const currentSpot = await Spot.findByPk(spotId);
    if (!currentSpot) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }
    // check if the current user is the spot's owner
    const currentOwner = currentSpot.ownerId;
    const userId = req.user.id;
    if (userId !== currentOwner) {
        const { startDate, endDate } = req.body;
        //set error message object and status code
        const err = new Error('Bad Request');
        err.status = 400;
        err.errors = {};
        //check if user provide startDate and endDate:
        if(!startDate || !endDate){
            res.status(400).json({
                message: "startDate and endDate are required"
            })
        }
        // check if the user input valide startDate and endDate
        let currTime = new Date();
        let year = currTime.getFullYear();
        let month = (currTime.getMonth() + 1).toString().padStart(2, '0');
        let day = currTime.getDate().toString().padStart(2, '0');
        let currDate = `${year}-${month}-${day}`;
        let numStartDate = parseInt(startDate.split('-').join(''));
        let numCurrDate = parseInt(currDate.split('-').join(''));
        let numEndDate = parseInt(endDate.split('-').join(''));
        if (!startDate || (numCurrDate - numStartDate >= 0)) {
            let msg = "startDate cannot be in the past";
            err.errors.startDate = msg
        }
        if (!endDate || (numEndDate - numStartDate <= 0)) {
            let msg = "endDate cannot be on or before startDate";
            err.errors.endDate = msg
        }
        // if the error obj is not empty, throw the error
        if ((Object.values(err.errors)).length) throw err;
        // check booking conflict
        const bookingsArrForCurrSpot = await Booking.findAll({
            where: {
                spotId: spotId
            }
        });
        for (let i = 0; i < bookingsArrForCurrSpot.length; i++) {
            const eachBooking = bookingsArrForCurrSpot[i];
            const existingStartDate = new Date(eachBooking.startDate);
            const existingEndDate = new Date(eachBooking.endDate);
            const newStartDate = new Date(startDate);
            const newEndDate = new Date(endDate);

            if (
                (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
                (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
                (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
            ) {
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                });
            }
        }

        const newBooking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        });
        res.json(newBooking)
    } else {
        res.status(403).json({ message: "You are the owner of this spot, you cannot create a booking" })
    }
})



module.exports = router;

