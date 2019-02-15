import axios from "axios";

export default {
  // Counts the number of eaters with the username
  favCount: function (eaterData) {
    return axios.post("/api/eaters/favcount", eaterData);
  },
  // Counts the number of eaters with the username
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
  getFavs: function (id) {
    return axios.get("/api/eaters/favs/" + id);
  },
  // Saves an eater to the database
  saveEater: function (eaterData) {
    return axios.post("/api/eaters", eaterData);
  },
  // Gets trucker
  findTrucker: function (id) {
    return axios.get("/api/truckers/" + id);
  },
  // Updates the trucker with the given id
  updateTrucker: function (id, truckerData) {
    return axios.put("/api/truckers/" + id, truckerData);
  },
 // Saves an eater to the database
  saveTrucker: function (truckerData) {
    return axios.post("/api/truckers", truckerData);
  }
};
