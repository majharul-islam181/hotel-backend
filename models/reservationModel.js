const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",  // Note the capitalization of "User" for consistency
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
        roomId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "rooms",
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
