import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState("/videos/clear-sky.mp4"); // Default video

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        
        const weatherCondition = weatherResponse.weather[0].main.toLowerCase();

        let newVideo = "/videos/clear-sky.mp4"; 

        if (weatherCondition.includes("thunderstorm")) {
          newVideo = "/videos/thunder.mp4";
        } else if (weatherCondition.includes("rain")) {
          newVideo = "/videos/rain.mp4";
        } else if (weatherCondition.includes("cloud")) {
          newVideo = "/videos/cloudy.mp4";
        } else if (weatherCondition.includes("snow")) {
          newVideo = "/videos/snow.mp4";
        } else if (weatherCondition.includes("fog") || weatherCondition.includes("mist")) {
          newVideo = "/videos/fog.mp4";
        }

        setBackgroundVideo(newVideo);
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      {}
      <video autoPlay muted loop className="background-video" key={backgroundVideo}>
      <source src={`${process.env.PUBLIC_URL}${backgroundVideo}`} type="video/mp4" />

      </video>
      
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;