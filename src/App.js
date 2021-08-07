import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState("London");
  const [temp, setTemp] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [cityName, setCityName] = useState("");
  const currDate = new Date();
  const weatherBackground =
    "https://t4.ftcdn.net/jpg/02/66/38/15/360_F_266381525_alVrbw15u5EjhIpoqqa1eI5ghSf7hpz7.jpg";

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      setTemp(data.main.temp);
      setWeatherType(data.weather[0].main);
      setCityName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <React.Fragment>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            name=""
            id="search"
            className="searchTerm"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <div class="container-fluid px-1 px-md-4 py-5 mx-auto">
        <div class="row d-flex justify-content-center px-3">
          <div
            class="card"
            style={{
              backgroundImage: `url("${weatherBackground}")`,
            }}
          >
            <h2 class="ml-auto mr-4 mt-3 mb-0 city-feat">{cityName}</h2>
            <p class="ml-auto mr-4 mb-0 med-font city-feat">{weatherType}</p>
            <h1
              style={{ color: "black" }}
              class="ml-auto mr-4 large-font city-feat"
            >
              {temp}&#176;
            </h1>
            <p class="time-font mb-0 ml-4 mt-auto">
              {currDate.getHours().toLocaleString()}:
              {currDate.getMinutes().toLocaleString() < 10 ? "0" : ""}
              {currDate.getMinutes().toLocaleString()}{" "}
              <span class="sm-font">
                {currDate.getHours().toLocaleString() >= 12 ? " pm" : "am"}
              </span>
            </p>
            <p class="ml-4 mb-4">Wednesday, 18 October 2019</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
