import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
console.log(REACT_APP_API_KEY);
const SearchInfo = ({ result }) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  // To get weather data, include an API_Key from the api
  // Used the weatherStack API to get the info
  useEffect(() => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          REACT_APP_API_KEY +
          "&query=" +
          result.name +
          "&units=m"
      )
      .then((response) => {
        return setWeatherInfo(response.data.current);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>{result.name}</h1>
      <div>The capital is {result.capital}</div>
      <div>Population of {result.population}</div>
      <h3>Languages</h3>
      <ul>
        {result.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={result.flag} alt="flag" width="300" height="200"></img>
      <h3>Weather in {result.name}</h3>
      <div>
        <b>temperature </b>
        <span>{weatherInfo.temperature} celcius</span>
      </div>
      <img
        src={weatherInfo.weather_icons}
        alt={weatherInfo.weather_descriptions}
      ></img>
      <div>
        <b>wind</b> {weatherInfo.wind_speed} kilometers/hour direction{" "}
        {weatherInfo.wind_dir}
      </div>
    </>
  );
};

export default SearchInfo;
