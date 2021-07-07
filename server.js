"use strict";

const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const weatherData = require("./data/weather.json");

const server = express();
const PORT = process.env.PORT;

server.use(cors());

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

// localhost:3001/weatherdata?reqCity=amman

server.get("/weatherdata", (req, res) => {
  try {
    let reqCity = weatherData.find((city) => {
      let reqWordDwn = req.query.reqCity.toLowerCase();
      let reqWordUp = reqWordDwn.charAt(0).toUpperCase() + reqWordDwn.slice(1);
      let normalizedReqCityName = reqWordUp;
      if (normalizedReqCityName === city.city_name) {
        return city;
      }
    });
    const cityWeatherData = reqCity.data.map((day) => {
      return new CityWeather(day.valid_date, day.weather.description);
    });
    res.status(200).send(cityWeatherData);
  } catch (error) {
    console.log("catch error");
    res.status(500).send(`Error: couldn't find what you are asking for`);
  }
});

class CityWeather {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}

server.get("*", (req, res) => {
  res.status(404).send("404: NOT FOUND");
});

var someNumber = 1;
try {
  someNumber.replace("-", ""); //You can't replace a int
} catch (err) {
  console.log("noo");
}
