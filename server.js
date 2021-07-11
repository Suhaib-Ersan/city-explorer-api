"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");

// const weatherData = require("./data/weather.json");
const axios = require("axios");

const server = express();
const PORT = process.env.PORT;


const weatherJS = require('./modules/weather');
const moviesJS = require('./modules/movies');

server.use(cors());

// localhost:3001/cities?cityName=amman
server.get("/cities", weatherJS);

// localhost:3001/movies?searchQuery=amman
server.get("/movies", moviesJS);


server.get("*", (req, res) => {
  res.status(404).send("404: NOT FOUND");
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});