import axios from "axios";

export default {
  // Gets all eaters
  findEater: function (eaterData) {
    console.log("HERE" + eaterData);
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
  // Gets all truckers
  getTruckers: function () {
    return axios.get("/api/truckers");
  },
  // Gets the eater with the given id
  getTrucker: function (id) {
    return axios.get("/api/truckers/" + id);
  },
  // Deletes the eater with the given id
  deleteTrucker: function (id) {
    return axios.delete("/api/truckers/" + id);
  },
  // Updates the eater with the given id
  updateTrucker: function (id, truckerData) {
    return axios.put("/api/truckers/" + id, truckerData);
  },
  // Saves a eater to the database
  saveTrucker: function (truckerData) {
    return axios.post("/api/truckers", truckerData);
  }
};
