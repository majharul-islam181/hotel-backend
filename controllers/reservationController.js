const reservationModel = require("../models/reservationModel");
const Reservation = require("../models/reservationModel");
const mongoose = require('mongoose'); 

// Create Reservation
/*

const createReservation = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId is required.",
      });
    }

    const { date, guest, queries, roomId , price, steeperCurrentIndex, roomTitle } = req.body;

    // Validate
    if (!date || !guest) {
      return res.status(400).send({
        success: false,
        message: "Date, guest, price and roomId are required.",
      });
    }

    // Create a new reservation
    const newReserve = new Reservation({
      userId,
      date,
      guest,
      queries,
      roomId,
      price,
      steeperCurrentIndex,
      roomTitle
    });

    await newReserve.save();
    res.status(200).send({
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

*/
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

    const { date, guest, queries, roomId, price, steeperCurrentIndex, roomTitle } = req.body;

    // Validate
    if (!date || !guest || !price || !roomId) {
      return res.status(400).send({
        success: false,
        message: "Date, guest, price, and roomId are required.",
      });
    }

    // Create a new reservation
    const newReserve = new Reservation({
      userId,
      date,
      guest,
      queries,
      roomId,
      price,
      steeperCurrentIndex,
      roomTitle,
      status: "Pending", // Default status
    });

    await newReserve.save();

    // Send notification to admin
    const sendAdminNotification = (reservationDetails) => {
      // Logic to send notification to admin
      console.log("New Reservation Created:", reservationDetails);
      // Example: Call Firebase, send email, or trigger SMS
    };

    sendAdminNotification(newReserve); // Notify admin

    res.status(200).send({
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

/*

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

*/

/*

const updateReservation = async (req, res) => {
  try {
      const { reservationId, status } = req.body;

      if (!reservationId || !['Accepted', 'Rejected'].includes(status)) {
          return res.status(400).send({
              success: false,
              message: "Reservation ID and valid status ('Accepted', 'Rejected') are required.",
          });
      }

      const reservation = await reservationModel.findById(reservationId);

      if (!reservation) {
          return res.status(404).send({
              success: false,
              message: "Reservation not found.",
          });
      }

      reservation.status = status;
      await reservation.save();

      res.status(200).send({
          success: true,
          message: `Reservation status updated to ${status}`,
          reservation,
      });

      // Send notification logic here (e.g., via email, SMS, or push notification)
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error updating reservation status",
      });
  }
};

*/


// Update Reservation
// User Update Reservation
const userUpdateReservation = async (req, res) => {
  try {
    const reserveId = req.params.id;

    // Validate reservation ID
    if (!reserveId) {
      return res.status(400).send({
        success: false,
        message: "Reservation ID is required.",
      });
    }

    // Find the reservation by ID
    const reserveRoom = await reservationModel.findById(reserveId);

    if (!reserveRoom) {
      return res.status(404).send({
        success: false,
        message: "No reservation found!",
      });
    }

    // Ensure the reservation is still pending
    if (reserveRoom.status && reserveRoom.status !== "Pending") {
      console.log(
        `Reservation ${reserveId} cannot be updated as it is already ${reserveRoom.status}.`
      );
      return res.status(403).send({
        success: false,
        message: "Cannot update a reservation that is already processed by the admin.",
      });
    }

    const { date, guest, queries } = req.body;

    // Validate required fields
    if (!date && !guest && !queries) {
      return res.status(400).send({
        success: false,
        message: "At least one field (date, guest, queries) is required to update.",
      });
    }

    // Update the reservation
    const updatedReservation = await reservationModel.findByIdAndUpdate(
      reserveId,
      {
        ...(date && { date }),
        ...(guest && { guest }),
        ...(queries && { queries }),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Reservation updated successfully.",
      updatedReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User Update Reservation API.",
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
const getReservationByUserId= async (req, res) => {
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

//delete reservation By User
const deleteReservationByUserId= async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(404).send({
        success: false,
        message: "No UserID found",
      });

    const updatedReservation = await reservationModel.findByIdAndDelete(userId);
    if (!updatedReservation)
      return res.status(404).send({
        success: false,
        message: "No reservation found",
      });

      res.status(200).send({
        success: true,
        message: "Found reservation successfully",
        totalReservation: updatedReservation.length,
        updatedReservation,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updatedReservation  APi",
    });
  }
};


//admin reservation Update

// Admin Update Reservation
const adminUpdateReservation = async (req, res) => {
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
        message: "No reservation found!",
      });
    }

    const { status } = req.body;

    // Validate status
    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status. Only 'Accepted' or 'Rejected' are allowed.",
      });
    }

    const updatedReservation = await reservationModel.findByIdAndUpdate(
      reserveId,
      { status },
      { new: true }
    );

    // Notify the user of the status change
    const sendUserNotification = (userId, reservationStatus) => {
      console.log(`Notification sent to User ${userId}: Your reservation is ${reservationStatus}.`);
      // Add real notification logic here
    };

    sendUserNotification(reserveRoom.userId, status);

    res.status(200).send({
      success: true,
      message: `Reservation ${status.toLowerCase()} successfully`,
      updatedReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Admin Update Reservation API",
    });
  }
};




module.exports = {
  createReservation,
  userUpdateReservation,
  getAllReservation,
  getReservationByUserId,
  deleteReservationByUserId,
  adminUpdateReservation,

};
