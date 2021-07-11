"use strict";

const axios = require("axios");
let recentHitsInMemory = {};

// https://api.themoviedb.org/3/search/movie?api_key=81a2f3850f9f6ca2f9e6bb5f104c39d6&query=irbid
// localhost:3001/movies?searchQuery=amman
function moviesJS(req, res) {
  let searchQuery = req.query.searchQuery;

  if (recentHitsInMemory[searchQuery] !== undefined) {
    console.log(`In movies.js, the request of ${searchQuery}'s data is in memory`);
    res.status(200).send(recentHitsInMemory[searchQuery]);
  } else {
    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&query=${searchQuery}`;

    axios
      .get(moviesUrl)
      .then((moviesGet) => {
        let movieListData = moviesGet.data.results.map((movie, idx) => {
          return new MovieData(movie);
        });
        // console.log(`movieListData = `,movieListData);
        recentHitsInMemory[searchQuery] = movieListData;
        res.status(200).send(movieListData);
      })
      .catch((error) => {
        res.status(500).send(`Something went wrong `, error);
      });
  }
}
class MovieData {
  constructor(movieData) {
    this.title = movieData.title;
    this.poster_path = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    this.avgVotes = movieData.vote_average;
    this.overview = movieData.overview;
    this.release_date = movieData.release_date;
  }
}

module.exports = moviesJS;
