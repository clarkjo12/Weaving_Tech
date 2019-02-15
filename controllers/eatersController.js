const db = require("../models");

// Defining methods for the eatersController
module.exports = {
  findEatersWithFav: function (req, res) {
    db.Eater
      .count(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findEater: function (req, res) {
    db.Eater
      .findOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Eater
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getFavs: function (req, res) {
    db.Eater
      .findById({ _id: req.params.id })
      .then(dbModel => {
        db.Trucker.find({username: dbModel.favorites, status: "open"}, function (error, count) {
          console.log(count);
          res.json(count);
        });
      })
      .catch(err => res.status(422).json(err));
  },
  find: function (req, res) {
    db.Eater
      .findOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Eater
      .updateOne({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateFav: function (req, res) {
    db.Eater
      .updateOne({ _id: req.params.id }, { $push: { favorites: req.body.favorites } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
