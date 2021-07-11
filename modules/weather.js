"use strict";

const axios = require("axios");
let recentHitsInMemory = {};

// const weatherData = require("../data/weather.json");

// https://api.weatherbit.io/v2.0/v2.0/forecast/daily?key=key&city=amman&days=5
// localhost:3001/cities?cityName=amman
function weatherJS(req, res) {
  let cityNameInQ = req.query.cityName;
  // console.log(`cityNameInQ = `, cityNameInQ);

  if (recentHitsInMemory[cityNameInQ] !== undefined) {
    console.log(`In weather.js, the request of ${cityNameInQ}'s data is in memory`);
    res.status(200).send(recentHitsInMemory[cityNameInQ]);
  } else {
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityNameInQ}&days=5`;
   

    axios
      .get(weatherUrl)
      .then((weatherGet) => {
        let weaArr = weatherGet.data.data.map((day, idx) => {
          return new CityWeather(day);
        });
        // console.log("weaArr ", weaArr);
        recentHitsInMemory[cityNameInQ] = weaArr;
        res.status(200).send(weaArr);
      })
      .catch((error) => {
        res.status(500).send(`Something went wrong `, error);
      });
  }
}

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
  constructor(item) {
    this.date = item.valid_date;
    this.desc = item.weather.description;
  }
}

module.exports = weatherJS;
