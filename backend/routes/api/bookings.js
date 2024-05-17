const express = require('express');
const bcrypt = require('bcryptjs');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot} = require('../../db/models');
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

// Get all of the current user's bookings--------------------------------
router.get('/current', requireAuth, async(req,res)=> {
    const currUser = req.user.id;
    const bookings = await Booking.findAll({
        where: {
            userId: currUser
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        }
    });
    await previewImage(bookings)
    res.json({Booking: bookings})
})


// Edit a booking --------------------------------------------------------
router.put('/:bookingId', requireAuth, async(req,res)=> {
    const currUser = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    //check if this booking exist in Booking
    if(!booking){
        res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }
    if(currUser === booking.userId){
        const {startDate, endDate} = req.body;
        //check if the provided dates are valide
         //set error message object and status code
         const err = new Error('Bad Request');
         err.status = 400;
         err.errors = {};
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
         // check if already past the end date of that booking
         const currBooking = await Booking.findAll({
            where: {
                id:bookingId
            }
        });
        const currBookingEnd = new Date(currBooking[0].endDate);
        const nowDate = new Date();
        if(currBookingEnd < nowDate){
            res.status(403).json({
                        "message": "Past bookings can't be modified"
                    })
        }
         // check booking conflict
         const bookingsArrForCurrSpot = await Booking.findAll();
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
        booking.startDate = startDate;
        booking.endDate = endDate;
        await booking.save();
        res.json(booking)
    }else {
        res.json({message:"You are not the owner of this booking, cannot edit"})
    }
})

// delete a booking--------------------------------------------------------CAN NOT delete the db record??
router.delete('/:bookingId', requireAuth, async(req,res)=> {
    // check if this booking belongs to the current logged in user
    const currUser = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    //check if this booking exist in Booking
    if(!booking){
        res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }
    if(currUser === booking.userId){
    // check if the booking already started
    const currBooking = await Booking.findAll({
        where: {
            id:bookingId
        }
    });
    const currBookingStart = new Date(currBooking[0].startDate);
    const nowDate = new Date();
    if(currBookingStart < nowDate){
        res.status(403).json({
                    "message": "Bookings that have been started can't be deleted"
                })
    }
    res.json({
        message: "Successfully deleted"
    })
    }else {
        res.json({
            message: "You are not the owner of this booking, you can not delete this booking!"
        })
    }
})








module.exports = router;