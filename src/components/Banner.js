import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();
  /* Fetching data from the API and setting the movie state to a random movie from the API. */
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  /**
   * If the length of the string is greater than n, return a substring of the first n characters, plus
   * an ellipsis. Otherwise, return the string
   * @param str - the string to be truncated
   * @param n - The number of characters to return.
   * @returns the string if it is longer than n, and if it is not, it is returning the string.
   */
  function truncate(str, n) {
    /* This is a ternary operator. It is saying if the length of the string is greater than n, return a
    substring of the first n characters, plus an ellipsis. Otherwise, return the string. */
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backdropPosition: "center center",
      }}
    >
      {/* Background image */}
      <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* 2 buttons */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List </button>
        </div>

        {/* description */}
        <h1 className="banner_description">{truncate(movie?.overview, 200)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
