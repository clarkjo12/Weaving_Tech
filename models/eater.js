const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

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
  favorites: { type: Array }
});

eaterSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

eaterSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/eater.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/eater.js hashPassword in pre save');
    this.password = this.hashPassword(this.password)
    next()
  }
})

const Eater = mongoose.model("Eater", eaterSchema);

module.exports = Eater;
