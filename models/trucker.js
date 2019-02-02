const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const truckerSchema = new Schema({
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
  status: { type: String, default: "closed" },
  favorites: { type: Number },
  image: { type: String, default: "https://via.placeholder.com/200" },
  summary: { type: String },
  title: { type: String }
});

const Trucker = mongoose.model("Trucker", truckerSchema);

module.exports = Trucker;
