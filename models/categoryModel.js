const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " Category title is required"],
      unique: [true, "Category name should be unique"],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffoodsafetyhelpline.com%2Ffssai-notification-related-to-exclusion-of-food-category-13-from-scope-of-proprietary-foods%2F&psig=AOvVaw3Q0vowy-Fy-9OYFT4vjjYW&ust=1722460049262000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOizhu3Vz4cDFQAAAAAdAAAAABAE"
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Apply the unique index manually if not already applied
categorySchema.index({ title: 1 }, { unique: true });

//export
module.exports = mongoose.model("Category", categorySchema);
