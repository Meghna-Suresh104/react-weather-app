import { useState } from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
    const [isCelsius, setIsCelsius] = useState(true);

    
    const tempCelsius = Math.round(data.main.temp);
    const tempFahrenheit = Math.round((data.main.temp * 9/5) + 32);
    const feelsLikeCelsius = Math.round(data.main.feels_like);
    const feelsLikeFahrenheit = Math.round((data.main.feels_like * 9/5) + 32);

    return (
        <div className='weather'>
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
            </div>
            
            <div className="bottom">
                <p className="temperature">
                    {isCelsius ? `${tempCelsius}°C` : `${tempFahrenheit}°F`}
                </p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">
                            {isCelsius ? `${feelsLikeCelsius}°C` : `${feelsLikeFahrenheit}°F`}
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{data.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>

            
            <div className="toggle-container">
                <span>°C</span>
                <div 
                    className={`slider-toggle ${isCelsius ? "" : "active"}`} 
                    onClick={() => setIsCelsius(!isCelsius)}
                >
                    <div className={`slider-circle ${isCelsius ? "" : "slide-right"}`}></div>
                </div>
                <span>°F</span>
            </div>
        </div>
    );
}

export default CurrentWeather;
