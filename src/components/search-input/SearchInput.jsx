import React, { useState } from "react";
import "./search-input.css";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

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
      setItems(data.map((item) => `${item.name} , ${item.country} `));
    } catch (error) {
      console.error(error);
    }
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
          placeholder="Enter The City Name"
        />
      </div>
    </div>
  );
};

export default SearchInput;
