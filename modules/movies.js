"use strict";

const { default: axios } = require("axios");

let recentHitsInMemory = {};

// https://api.themoviedb.org/3/search/movie?api_key=81a2f3850f9f6ca2f9e6bb5f104c39d6&query=irbid

const moviesJS = async (req, res) => {
  try {
    if (recentHitsInMemory[req.query.cityName] !== undefined) {
      console.log(`the request of ${req.query.cityName}'s data is in memory`);
      response.status(200).send(recentHitsInMemory[req.query.cityName]);
    } else {
      let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&query=${req.query.cityName}`;
      // `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${req.query.cityName}&days=5`;

      let moviesGet = await axios.get(moviesUrl);
      // weatherGet = weatherData;
      // console.log(moviesGet);
      // console.log(weatherGet.data.data);

      let movieListData = moviesGet.data.results.map((movie) => {
        return new Movie(movie.title, movie.poster_path, movie.overview, movie.vote_count, movie.release_date);
      });
      recentHitsInMemory[req.query.cityName] = movieListData;

      res.status(200).send(movieListData);
    }
  } catch (error) {
    res.status(500).send(`Something went wrong `, error);
  }
};

class MovieData {
  constructor(movieTitle, movieImage, overview, release_date) {
    this.title = movieTitle;
    this.poster_path = `https://image.tmdb.org/t/p/w500/${movieImage}`;
    this.overview = overview;
    this.release_date = release_date;
  }
}

module.exports = moviesJS;
