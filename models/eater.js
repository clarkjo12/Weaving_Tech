const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eaterSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'] // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    timestamp: { type: Number, default: Date.now }
  },
  isActive: { type: Boolean },
  favorites: { type: Array }
});

const Eater = mongoose.model("Eater", eaterSchema);

module.exports = Eater;
