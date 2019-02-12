import axios from "axios";

export default {
  findEaters: function (eaterData) {
    return axios.post("/api/eaters/count", eaterData);
  },
  // Gets eater
  findEater: function (eaterData) {
    return axios.post("/api/eaters/login", eaterData);
  },
  // Updates the eater with the given id
  updateEaterLoc: function (id, eaterData) {
    return axios.put("/api/eaters/loc/" + id, eaterData);
  },
  // Updates the eater with the given id
  updateEaterFav: function (id, eaterData) {
    return axios.put("/api/eaters/fav/" + id, eaterData);
  },
  // Saves a eater to the database
  saveEater: function (eaterData) {
    return axios.post("/api/eaters", eaterData);
  },
  // Gets trucker
  findTrucker: function (truckerData) {
    return axios.get("/api/truckers/login", truckerData);
  },
  // Updates the eater with the given id
  updateTruckerLoc: function (id, truckerData) {
    return axios.put("/api/truckers/loc/" + id, truckerData);
  },
  // Updates the eater with the given id
  updateTruckerFav: function (id, truckerData) {
    return axios.put("/api/truckers/fav/" + id, truckerData);
  },
  // Saves a eater to the database
  saveTrucker: function (truckerData) {
    return axios.post("/api/truckers", truckerData);
  }
};
