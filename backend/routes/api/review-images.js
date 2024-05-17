const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot} = require('../../db/models');

const router = express.Router();

router.get('/', async(req, res)=> {
    const info = await ReviewImage.findAll()
    res.json(info)
})

// delete a review image
router.delete('/:imageId', requireAuth, async(req, res)=> {
     // check if this image belongs to the current logged in user
     const currUser = req.user.id;
     const imgId = req.params.imageId;
     const img = await ReviewImage.findByPk(imgId);
     //check if this image exist in Review-image
     if(!img){
         res.status(404).json({
             "message": "Spot Image couldn't be found"
         })
     }
     const reviewId = img.reviewId;
     const review = await Review.findByPk(reviewId);
     if(currUser === review.userId){
        await img.destroy();
        res.status(200).json({
            "message": "Successfully deleted"
        })
     }else {
        res.json({
            message: "You are not the owner of this image, you cannot delete it!"
        })
     }
})





module.exports = router;