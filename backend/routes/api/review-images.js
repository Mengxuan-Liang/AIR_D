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
         return res.status(404).json({
             "message": "Review Image couldn't be found"
         })
     }
     const reviewId = img.reviewId;
     const review = await Review.findByPk(reviewId);
     if(!review || !review.userId){
        return res.status(404).json({
            message: "No Review found or does not have a valid user"
        })
     }
     if(currUser === review.userId){
        await img.destroy();
        return res.status(200).json({
            "message": "Successfully deleted"
        })
     }else {
        return res.status(403).json({
            message: "You are not the owner of this image, you cannot delete it!"
        })
     }
})





module.exports = router;