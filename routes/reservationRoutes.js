const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createReservation, updateReservation, getAllReservation, getReservationController } = require('../controllers/reservationController');


const router = express.Router();


//Create Reservation
router.post('/create/:id', authMiddleware, createReservation);

//Get all Reservation
router.get('/getAll', authMiddleware, getAllReservation);

//Get all reservation by userId
router.get('/getReservationByUser/:id', authMiddleware, getReservationController  )

//Update Reservation
router.put('/updateReservation/:id', authMiddleware, updateReservation);

module.exports = router;