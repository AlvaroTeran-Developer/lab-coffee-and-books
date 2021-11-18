const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const placeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["coffe shop", "bookstore"],
      default: "bookstore",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

placeSchema.index({ location: "2dsphere" });

const Place = model("Place", placeSchema);

module.exports = Place;
