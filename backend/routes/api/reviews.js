const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot } = require('../../db/models');
const { where } = require('sequelize');

const router = express.Router();

//helper function to get peviewImage url
async function previewImage(spot) {
    const spotArr = spot;
    for (let i = 0; i < spotArr.length; i++) {
        let oneSpot = spotArr[i];
        const spotImg = await SpotImage.findAll({
            // attributes: ['url'],
            where: { spotId: oneSpot.id }
        });
        let url = null;
        if (spotImg.length > 0) {
            url = spotImg[0].dataValues.url;
        }
        oneSpot.Spot.dataValues.previewImage = url;
    }
}

// Get all Reviews of the Current User-------------------------------------
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description']
                }
                // include: [
                //     {
                //         model: SpotImage,
                //         attributes: ['url'],
                //         as: 'previewImage'
                //     }
                // ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    await previewImage(reviews)
    res.json({ Review: reviews })
})


// Add an Image to a Review based on the Review's id------------------------------------------
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    // check if the review belongs to current user
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    // check if the review id exist in the reviews
    if (!review) {
        res.status(404).json({ "message": "Review couldn't be found" })
    }
    // check if the review has reach max of 10 images
    const totalImgForThisReveiw = await ReviewImage.count({
        where: {
            reviewId: reviewId
        }
    });
    if (totalImgForThisReveiw >= 10) {
       return res.status(403).json({ "message": "Maximum number of images for this resource was reached" })
    }
    const reviewOwner = review.dataValues.userId;
    const currUser = req.user.id;
    if (reviewOwner === currUser) {
        const { url } = req.body;
        const newImg = await ReviewImage.create({
            url,
            reviewId
        });
        res.json(newImg);
    }else {
        res.status(403)
        res.json({"message": "You are not the owner of this review"})
    }
})

// edit a review ----------------------------------------------
router.put('/:reviewId', requireAuth, async (req, res) => {
    // check if the review belongs to current user
    const reviewId = req.params.reviewId;
    const currReview = await Review.findByPk(reviewId);
    //check if the provided reviewId exist in the reviews
    if(!currReview){
        res.status(404).json({"message": "Review couldn't be found"})
    }
    const reviewOwner = currReview.dataValues.userId;
    const currUser = req.user.id;
    if (reviewOwner === currUser) {
        const { review, stars } = req.body;
        // check if provided review and stars are valide
        const err = new Error('Bad Request');
        err.status = 400;
        err.errors = {};
        if (!review || review.trim() === '') {
            let msg = "Review text is required";
            err.errors.review = msg
        }
        // if (!Number.isInteger(stars)||stars < 1 || stars > 5 || !stars || stars.toString().trim() === '') {
        if (stars < 1 || stars > 5 || !stars || stars.toString().trim() === '') {
            let msg = "Stars must be an integer from 1 to 5";
            err.errors.stars = msg
        }
        if ((Object.values(err.errors)).length) throw err;
        //edit the review
        if (review !== undefined) currReview.review = review;
        if (stars !== undefined) currReview.stars = stars;
        await currReview.save();
        res.json(currReview)
    }else {
        res.status(400)
        res.json({"message": "You are not the owner of this review"})
    }
})

//delete a review ---------------------------------------------------
router.delete('/:reviewId', requireAuth, async(req, res)=> {
    // check if the review belongs to current user
    const reviewId = req.params.reviewId;
    const currReview = await Review.findByPk(reviewId);
    //check if the provided reviewId exist in the reviews
    if(!currReview){
        res.status(404).json({"message": "Review couldn't be found"})
    }
    const reviewOwner = currReview.dataValues.userId;
    const currUser = req.user.id;
    if (reviewOwner === currUser) {
        await currReview.destroy();
        res.json({"message": "Successfully deleted"})
    }else {
        res.status(400)
        res.json({"message": "You are not the owner of this review"})
    }
})

module.exports = router;