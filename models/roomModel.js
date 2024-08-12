const mongoose = require("mongoose");

//schema
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " Hotel title is required"],
      unique: [true, "Hotel name should be unique"],
      trim: true,
    },
    description: {
        type: String,
        required: [true, "Hotel Description is required"]
    },
    price:{
        type: Number,
        required: [true, "Hotel price is required."]
    },
    imageUrl: {
        type: Array,
        required: [true, "Hotel picture is required."]
      },
    hotelTags:{
        type: String,
    },
    location: {
      type: String,
      
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, 'Hotel Category is required.']
    },
    phoneNumber: {
      type: String,
      required : true,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    }, 
    isFavourite:{
      type: Boolean,
      default: false,
    },
    rating:{
        type: Number,
        default: 5,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Apply the unique index manually if not already applied
// roomSchema.index({ title: 1 }, { unique: true });

//export
module.exports = mongoose.model("rooms", roomSchema);
