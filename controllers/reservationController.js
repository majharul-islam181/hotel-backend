const reservationModel = require("../models/reservationModel");
const Reservation = require("../models/reservationModel");

// Create Reservation
const createReservation = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId is required.",
      });
    }

    const { date, guest, queries, roomId } = req.body;

    // Validate
    if (!date || !guest || !roomId) {
      return res.status(400).send({
        success: false,
        message: "Date, guest and roomId are required.",
      });
    }

    // Create a new reservation
    const newReserve = new Reservation({
      userId,
      date,
      guest,
      queries,
      roomId,
    });

    await newReserve.save();
    res.status(201).send({
      success: true,
      message: `Successfully reserved by ${userId}`,
      newReserve,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Reservation API",
    });
  }
};

// Update Reservation
const updateReservation = async (req, res) => {
  try {
    const reserveId = req.params.id;
    if (!reserveId) {
      return res.status(400).send({
        success: false,
        message: "reserveId is required.",
      });
    }

    const reserveRoom = await reservationModel.findById(reserveId);
    if (!reserveRoom) {
      return res.status(404).send({
        success: false,
        message: "No Room found!",
      });
    }

    const { date, guest, queries } = req.body;
    const updateReservation = await reservationModel.findByIdAndUpdate(
      reserveId,
      {
        date,
        guest,
        queries,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Updated successfully",
      updateReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Reserve Api",
    });
  }
};

//Get All Reservation
const getAllReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.find({});
    if (!reservation) {
      res.status(404).send({
        success: false,
        message: "No reservation found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Found reservation successfully",
      totalFoods: reservation.length,
      reservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Reservation APi",
    });
  }
};

//Get reservation By User
const getReservationController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(404).send({
        success: false,
        message: "No UserID found",
      });

    const reservation = await reservationModel.find({userId : userId});
    if (!reservation)
      return res.status(404).send({
        success: false,
        message: "No reservation found",
      });

      res.status(200).send({
        success: true,
        message: "Found reservation successfully",
        totalReservation: reservation.length,
        reservation,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Reservation APi",
    });
  }
};

module.exports = {
  createReservation,
  updateReservation,
  getAllReservation,
  getReservationController
};
