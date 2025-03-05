import React, { useState } from "react";
import "./forecast.css";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  
  const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

  return (
    <>
      <label className="title">Daily Forecast</label>
      <div className="forecast-grid">
        {data.list.slice(0, 7).map((item, idx) => (
          <div
            key={idx}
            className={`forecast-item ${flippedIndex === idx ? "flipped" : ""}`}
            onClick={() => handleFlip(idx)}
          >
            {/* Front side */}
            <div className="front">
              <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
              <label className="day">{forecastDays[idx]}</label>
              <label className="min-max">
                {Math.round(item.main.temp_max)}°C / {celsiusToFahrenheit(item.main.temp_max)}°F
              </label>
            </div>

            {/* Back side */}
            <div className="back">
              <label>Humidity: {item.main.humidity}%</label>
              <label>Wind: {item.wind.speed} m/s</label>
              <label>Pressure: {item.main.pressure} hPa</label>
              <label>Clouds: {item.clouds.all}%</label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Forecast;
