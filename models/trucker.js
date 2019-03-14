const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const truckerSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  code: { type: String },
  picture: { type: String, default: "https://via.placeholder.com/200" },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {},
    timestamp: { type: Number }
  },
  status: { type: String, default: "closed" },
  favorites: { type: Number },
  summary: { type: String },
  title: { type: String },
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

truckerSchema.set('toJSON', { getters: true, virtuals: true });

truckerSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
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

truckerSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
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

const Trucker = mongoose.model("Trucker", truckerSchema);

module.exports = Trucker;
