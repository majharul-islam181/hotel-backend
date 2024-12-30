const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createReservation, userUpdateReservation, getAllReservation, getReservationController, getReservationByUserId, deleteReservationByUserId } = require('../controllers/reservationController');


const router = express.Router();

//Create Reservation 
router.post('/create/:id', authMiddleware, createReservation);

//Get all Reservation
router.get('/getAllReservation', authMiddleware, getAllReservation);

//Get all reservation by userId
router.get('/getReservationByUser/:id',getReservationByUserId);

//Update Reservation
router.put('/updateReservation/:id', authMiddleware, userUpdateReservation);

//Delete Reservation by userid
router.put('/deleteReservationByUserId/:id', authMiddleware, deleteReservationByUserId );

module.exports = router;