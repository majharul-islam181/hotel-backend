const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Note the capitalization of "User" for consistency
    },
    date: {
      type: String,
      required: true,
    },
    guest: {
      type: String,
      required: true,
    },
    queries: {
      type: String,
    },
    roomTitle: {
      type: String,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    steeperCurrentIndex: {
      type: Number,
      // default: 1,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
