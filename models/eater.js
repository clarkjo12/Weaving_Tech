const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eaterSchema = new Schema({
  username: { type: String, required: true },
  password: { type: Array, required: true },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    timestamp: { type: Number, required: true, default: Date.now }
  },
  isactive: { type: Boolean },
  favorites: { type: Array }
});

const Eater = mongoose.model("Eater", eaterSchema);

module.exports = Eater;
