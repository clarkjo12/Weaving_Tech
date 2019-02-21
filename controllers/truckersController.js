const db = require("../models");
const notifyCustomers = require("../notifyCustomers").notifyCustomers;

// Defining methods for the trucksController
module.exports = {
  findTruck: function(req, res) {
    db.Trucker
      .findOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTrucks: function(req, res) {
    db.Trucker
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Trucker
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Trucker
      .updateOne({ _id: req.params.id }, req.body)
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => {
        if (req.body.status === 'open') notifyCustomers(req.params.id)

        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  }
};
