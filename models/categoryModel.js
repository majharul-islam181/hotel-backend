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
