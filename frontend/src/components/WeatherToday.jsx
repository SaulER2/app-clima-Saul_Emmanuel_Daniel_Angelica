import React from "react";
import ForecastDays from "./ForecastDays";

export default function WeatherToday({ cityData, selectedIndex, onSelectDay, forecast, city }) {
    const selected = cityData.forecast[selectedIndex];

    return (
        <section className="weather-today">
            <article className="current-weather">
                <div className="current-left">
                    <span className="big-icon">{forecast.list && <img src={`https://openweathermap.org/img/wn/${forecast.list[selectedIndex * 8].weather[0].icon}@2x.png`} alt={forecast.list[selectedIndex * 8].weather[0].description} />}</span>
                    <div className="location">
                        <h2>
                            <span className="place">{city}</span>
                        </h2>
                        <p className="description">{forecast.list && forecast.list[selectedIndex * 8].weather[0].description}</p>
                    </div>
                </div>

                <div className="current-right">
                    <span className="temp-now">{forecast.list && Math.round(forecast.list[selectedIndex * 8].main.temp)}°</span>
                </div>
            </article>

            <ForecastDays
                forecast={forecast}
                selectedIndex={selectedIndex}
                onSelect={onSelectDay}
            />
        </section>
    );
}