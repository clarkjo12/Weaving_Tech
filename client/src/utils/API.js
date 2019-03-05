import axios from "axios";

export default {
  // Logout
  logout: function () {
    return axios.post("/logout");
  },
  //---------------------------Eaters DB-------------------------------------
  // Counts the number of eaters with a particular favorite
  favCount: function (eaterData) {
    return axios.post("/api/eaters/favcount", eaterData);
  },
  // Counts the number of eaters with the username
  findEaters: function (eaterData) {
    return axios.post("/api/eaters/login", eaterData);
  },
  // Saves an eater to the database
  saveEater: function (eaterData) {
    return axios.post("/api/eaters/signup", eaterData);
  },
  // Checks to see which of the eaters favorite trucks are open
  getFavs: function (id) {
    return axios.get("/api/eaters/favs/" + id);
  },
  // Gets eater
  findEater: function (id) {
    return axios.get("/api/eaters/" + id);
  },
  // Updates the eater with the given id
  updateEater: function (id, eaterData) {
    return axios.put("/api/eaters/" + id, eaterData);
  },
  // Adds to eaters favorites with the given id
  updateEaterFav: function (id, eaterData) {
    return axios.put("/api/eaters/fav/" + id, eaterData);
  },
  // Removes from eaters favorites with the given id
  removeEaterFav: function (id, eaterData) {
    return axios.put("/api/eaters/removefav/" + id, eaterData);
  },
  //---------------------------Trucks DB-------------------------------------
  // Gets trucker
  findTrucker: function (id) {
    return axios.get("/api/truckers/" + id);
  },
  findTrucks: function () {
    return axios.get("/api/truckers/");
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
