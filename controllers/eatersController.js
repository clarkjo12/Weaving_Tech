const db = require("../models");

// Defining methods for the eatersController
module.exports = {
  findEater: function (req, res) {
    console.log(req);
    db.Eater
      .count(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Eater
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateLoc: function (req, res) {
    db.Eater
      .updateOne({ _id: req.params.id }, { location: req.body.location })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateFav: function (req, res) {
    db.Eater
      .updateOne({ _id: req.params.id }, { $push: {favorites: req.body.favorites } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
