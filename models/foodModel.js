const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " Food title is required"],
      unique: [true, "Food name should be unique"],
      trim: true,
    },
    description: {
        type: String,
        required: [true, "Food Description is required"]
    },
    price:{
        type: Number,
        required: [true, "Food price is required."]
    },
    imageUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffoodsafetyhelpline.com%2Ffssai-notification-related-to-exclusion-of-food-category-13-from-scope-of-proprietary-foods%2F&psig=AOvVaw3Q0vowy-Fy-9OYFT4vjjYW&ust=1722460049262000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOizhu3Vz4cDFQAAAAAdAAAAABAE"
      },
    foodTags:{
        type: String,

    },
    category:{
        type: String,
    },
    code:{
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    

    resturant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resturant"
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
// foodSchema.index({ title: 1 }, { unique: true });

//export
module.exports = mongoose.model("food", foodSchema);
