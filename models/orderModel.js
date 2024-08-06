const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"food"
    }],
    payment: { type: Number, required: true },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status: {
        type: String, 
        enum: ['preparing', "prepare","on the way", "deliverd"],
        default: "preparing",
    },

}, {timestamps: true});

module.exports = mongoose.model("orders", orderSchema);