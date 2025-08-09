import { useState } from "react";
import { Context } from "./context";

export const Provider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});

  return (
    <Context.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </Context.Provider>
  );
};
