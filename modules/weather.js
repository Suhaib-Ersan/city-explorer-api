"use strict";

const { default: axios } = require("axios");
let recentHitsInMemory = {};

const weatherData = require("../data/weather.json");
const moviesJS = require("./movies");

// https://api.weatherbit.io/v2.0/v2.0/forecast/daily?key=key&city=amman&days=5

const weatherJS = async (req, res) => {
  try {
    if (recentHitsInMemory[req.query.cityName] !== undefined) {
      console.log(`the request of ${req.query.cityName}'s data is in memory`);
      response.status(200).send(recentHitsInMemory[req.query.cityName]);
    } else {
      let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${req.query.cityName}&days=5`;

      let weatherGet = await axios.get(weatherUrl);
      // weatherGet = weatherData;
      // console.log(`weatherGet !== undefined`,weatherGet !== undefined);
      // console.log(`weatherGet.data.data !== undefined`, weatherGet.data.data !== undefined);

      let cityWeatherData = weatherGet.data.data.map((day) => {
        return new CityWeather(day.description, day.weather.description);
      });
      recentHitsInMemory[req.query.cityName] = cityWeatherData;
      console.log(movieListData);
      res.status(200).send(cityWeatherData);
    }
  } catch (error) {
    res.status(500).send(`Something went wrong `, error);
  }
};

// localhost:3001/cities?reqCity=amman
// server.get("/cities", (req, res) => {
//   try {
//     let reqCity = weatherData.find((city) => {
//       let reqWordDwn = req.query.reqCity.toLowerCase();
//       let reqWordUp = reqWordDwn.charAt(0).toUpperCase() + reqWordDwn.slice(1);
//       let normalizedReqCityName = reqWordUp;
//       if (normalizedReqCityName === city.city_name) {
//         return city;
//       }
//     });
//     const cityWeatherData = reqCity.data.map((day) => {
//       return new CityWeather(day.valid_date, day.weather.description);
//     });
//     res.status(200).send(cityWeatherData);
//   } catch (error) {
//     // console.log("catch error");
//     res.status(500).send(`Error: couldn't find what you are asking for <br/>`,error);
//   }
// });

class CityWeather {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}

module.exports = weatherJS;
