import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // require(".env").config();
  // const APIKEY = "3d27350a1c632cd22f0b0a55f7cce822";

  const APIKEY = process.env.REACT_APP_API_KEY;

  // `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <div className="text-center p-4 )">
            <input
              className="rounded-2xl p-3 text-lg  border-solid  bg-gray-900  ] outline-none"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter location"
              onKeyDown={searchLocation}
            ></input>

            <div className="top w-full m-4-[auto]">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? (
                  <p className="description__para">
                    {data.weather[0].description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="bottom flex justify-center space-x-10  bg-[rgba(0,0,0,0.35)] p-12 rounded-[1rem] ">
            <div className="feels ">
              {data.main ? (
                <p className="text-2xl">
                  Feels like
                  <br /> {Math.round(data.main.feels_like)}°C
                </p>
              ) : null}
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="text-2xl">
                  Humidty:
                  <br /> {Math.round(data.main.humidity)}%
                </p>
              ) : null}
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="text-2xl">
                  Wind:
                  <br /> {data.wind.speed}
                </p>
              ) : null}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
