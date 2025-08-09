import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Navbar from "./components/navbar/Navbar";
import SearchInput from "./components/search-input/SearchInput";

import { Provider } from "./context";

function App() {
  return (
    <Provider>
      <div className="App">
        <Navbar />
        <SearchInput />
        <CurrentWeather />
      </div>
    </Provider>
  );
}

export default App;
