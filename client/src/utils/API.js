import axios from "axios";

export default {
  // Gets all eaters
  getEaters: function() {
    return axios.get("/api/eaters");
  },
  // Gets the eater with the given id
  getEater: function(id) {
    return axios.get("/api/eaters/" + id);
  },
  // Deletes the eater with the given id
  deleteEater: function(id) {
    return axios.delete("/api/eaters/" + id);
  },
  // Updates the eater with the given id
  updateEater: function(eaterData) {
    return axios.put("/api/eaters/", eaterData);
  },
  // Saves a eater to the database
  saveEater: function(eaterData) {
    return axios.post("/api/eaters", eaterData);
  },
  // Gets all truckers
  getTruckers: function() {
    return axios.get("/api/truckers");
  },
  // Gets the eater with the given id
  getTrucker: function(id) {
    return axios.get("/api/truckers/" + id);
  },
  // Deletes the eater with the given id
  deleteTrucker: function(id) {
    return axios.delete("/api/truckers/" + id);
  },
  // Updates the eater with the given id
  updateTrucker: function(id, truckerData) {
    return axios.put("/api/truckers/" + id, truckerData);
  },
  // Saves a eater to the database
  saveTrucker: function(truckerData) {
    return axios.post("/api/truckers", truckerData);
  }
};
