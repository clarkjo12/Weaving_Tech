const db = require("../models");

// Defining methods for the trucksController
module.exports = {
  findAll: function(req, res) {
    db.Trucker
      .find(req.body)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Trucker
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateLoc: function(req, res) {
    db.Trucker
      .updateOne({ _id: req.params.id }, { location: req.body.location })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateStatus: function(req, res) {
    db.Trucker
      .updateOne({ _id: req.params.id }, { status: req.body.status })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateFav: function(req, res) {
    db.Trucker
      .findOneAndUpdate({ _id: req.params.id }, {$inc : {'favorites' : 1}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
