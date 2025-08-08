import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Navbar from "./components/navbar/Navbar";
import SearchInput from "./components/search-input/SearchInput";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchInput />
      <CurrentWeather />
    </div>
  );
}

export default App;
