import React, { useState, useEffect } from "react";
import instance from "./axios";
import "./Banner.css";
import requests from "./requests";

const baseUrl = "https://image.tmdb.org/t/p/original/";
const truncate = (str, len) => {
  if (str?.length > len) {
    if (len <= 3) {
      return str.slice(0, len - 3) + "...";
    } else {
      return str.slice(0, len) + "...";
    }
  } else {
    return str;
  }
};

function Banner() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            ${baseUrl}${movies?.backdrop_path || movies?.poster_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1>{movies?.title || movies?.name || movies?.original_name}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
          <p>{truncate(movies?.overview, 150)}</p>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
