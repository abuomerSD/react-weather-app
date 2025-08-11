import React from "react";
import "./current-weather.css";
import { useContext } from "react";
import { Context } from "../../context";
import dayjs from "dayjs";

const CurrentWeather = () => {
  const { weatherData } = useContext(Context);

  return (
    <>
      {weatherData.temp ? (
        <div className="container">
          <div className="centered-row">
            <div className="current-weather-card">
              <div className="row">
                <div className="col">
                  <img src={`/images/icons/${weatherData.icon}.png`} alt="" />
                  <h3>{weatherData.description}</h3>
                </div>
                <div className="col">
                  <h2>{weatherData.city}</h2>
                  <h1>{weatherData.temp ? `${weatherData.temp}°C` : ""}</h1>
                </div>
              </div>
              <div className="card-down-row">
                {weatherData?.forecastData?.map((item, index) => (
                  <div className="rounded-col" key={index}>
                    <h4>{dayjs.unix(item.dt).format("hA")}</h4>
                    <img src={`/images/icons/${item.icon}.png`} alt="" />
                    <h5>{Math.floor(item.temp)}°C</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CurrentWeather;
