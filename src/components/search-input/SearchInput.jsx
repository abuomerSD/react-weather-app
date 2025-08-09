import React, { useContext, useState } from "react";
import "./search-input.css";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";
import { Context } from "../../context";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const { weatherData, setWeatherData } = useContext(Context);

  const WEATHER_API_KEY = "1e3992d30d09886d401078378bf28026";

  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: {
      namePrefix: value,
    },
    headers: {
      "x-rapidapi-key": "7c6ce69298mshe3eb1f6a4935416p1f9490jsnfdadf5c72236",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  //   fecth city names from the cities API
  const search = async () => {
    try {
      const response = await axios.request(options);
      const data = response.data.data;
      console.log("data", data);
      setItems(data.map((item) => `${item.name}`));
    } catch (error) {
      console.error(error);
    }
  };

  // update current weather when input changes'

  const updateWeather = async (cityName) => {
    console.log("update current weather...");

    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );
    console.log("currentWeatherResponse data", currentWeatherResponse.data);

    const forecastWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );
    console.log("forecastWeatherResponse data", forecastWeatherResponse.data);

    const current = currentWeatherResponse.data;
    const forecast = forecastWeatherResponse.data;

    const obj = {
      current,
      forecast,
      city: current.name,
      temp: Math.floor(current.main.temp),
      description: current.weather[0].description,
      icon: current.weather[0].icon,
    };

    console.log("obj", obj);
    setWeatherData(obj);
  };

  return (
    <div className="container">
      <div className="search-row">
        <AutoComplete
          className="search-input"
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => setValue(e.value)}
          onSelect={(e) => {
            setValue(e.value);
            console.log("value", e.value);
            updateWeather(e.value);
          }}
          placeholder="Enter The City Name"
        />
      </div>
    </div>
  );
};

export default SearchInput;
