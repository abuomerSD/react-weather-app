import React, { useContext, useRef, useState } from "react";
import "./search-input.css";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";
import { Context } from "../../context";
import { Toast } from "primereact/toast";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const { weatherData, setWeatherData } = useContext(Context);
  const toast = useRef(null);

  const WEATHER_API_KEY = "1e3992d30d09886d401078378bf28026";

  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    headers: {
      "x-rapidapi-key": "7c6ce69298mshe3eb1f6a4935416p1f9490jsnfdadf5c72236",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  //   fecth city names from the cities API
  const search = async (e) => {
    try {
      const query = e.query;

      const response = await axios.request({
        ...options,
        params: { namePrefix: query },
      });
      const data = response.data.data;
      console.log("data", data);

      setItems(data.map((item) => `${item.name}`));
    } catch (error) {
      console.error(error);
    }
  };

  // update current weather when input changes'

  const updateWeather = async () => {
    try {
      console.log("update current weather...");

      // check if input is empty
      if (value === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Please Choose a City First",
          life: 3000,
        });
        return;
      }

      const currentWeatherResponse = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${WEATHER_API_KEY}&units=metric`
        )
        .catch((error) => {
          console.log("req error", error);
          // check if city not found
          if (error.status === 404) {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Please Choose a Correct City",
              life: 3000,
            });
            return;
          }
        });
      console.log("currentWeatherResponse", currentWeatherResponse);

      const forecastWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${WEATHER_API_KEY}&units=metric`
      );
      console.log("forecastWeatherResponse", forecastWeatherResponse);

      const current = currentWeatherResponse.data;
      const forecast = forecastWeatherResponse.data;

      const now = Date.now() / 1000;
      const forecastData = [];

      // adding forcast data to state obj

      let index = 1;
      forecast.list.forEach((item) => {
        if (item.dt > now && index <= 5) {
          forecastData.push({
            dt: item.dt,
            temp: item.main.temp,
            icon: item.weather[0].icon,
          });
          index++;
        }
      });

      console.log("forecastData", forecastData);

      const obj = {
        city: current.name,
        temp: Math.floor(current.main.temp),
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        forecastData,
      };

      console.log("obj", obj);
      setWeatherData(obj);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Toast ref={toast} position="top-right" className="toast" />
      <div className="search-row">
        <AutoComplete
          className="search-input"
          value={value}
          completeMethod={search}
          suggestions={items}
          onChange={(e) => setValue(e.value)}
          placeholder="Enter The City Name"
        />
      </div>
      <div className="btn-search-row">
        <button className="btn-search" onClick={updateWeather}>
          Get Weather Data
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
