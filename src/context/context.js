import { createContext } from "react";

export const Context = createContext({
  weatherData: {},
  setWeatherData: () => {},
});
