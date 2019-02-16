const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const eaterSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String },
  picture: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {},
    timestamp: { type: Number }
  },
  favorites: { type: Array },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

eaterSchema.set('toJSON', { getters: true, virtuals: true });

eaterSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
    'facebookProvider.id': profile.id
  }, function (err, user) {
    // no user was found, lets create a new one
    if (!user) {
      var newUser = new that({
        username: profile.displayName,
        picture: profile.photos[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      });

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

eaterSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
    'googleProvider.id': profile.id
  }, function (err, user) {
    // no user was found, lets create a new one
    if (!user) {
      var newUser = new that({
        username: profile.displayName,
        picture: profile._json['picture'],
        googleProvider: {
          id: profile.id,
          token: accessToken
        },
      });

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

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
