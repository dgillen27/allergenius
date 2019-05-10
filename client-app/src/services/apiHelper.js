const axios = require("axios");

const api = axios.create({
  baseURL: "https://aller-genius.herokuapp.com"
});

const updateToken = token => {
  localStorage.setItem("authToken", token);
  console.log("this is token", token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

module.exports = {
  api,
  updateToken
};
