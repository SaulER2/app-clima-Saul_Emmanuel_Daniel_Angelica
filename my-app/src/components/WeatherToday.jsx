import React from "react";
import ForecastDays from "./ForecastDays";

export default function WeatherToday({ cityData, selectedIndex, onSelectDay }) {
    const selected = cityData.forecast[selectedIndex];

    return (
        <section className="weather-today">
            <div className="current-weather">
                <div className="current-left">
                    <span className="big-icon">{selected.icon}</span>
                    <div className="location">
                        <h2>
                            <span className="county">{cityData.country}</span>, {" "}
                            <span className="place">{cityData.name}</span>
                        </h2>
                        <p className="description">{selected.desc}</p>
                    </div>
                </div>

                <div className="current-right">
                    <span className="temp-now">{selected.temp}°</span>
                </div>
            </div>

            <ForecastDays
                forecast={cityData.forecast}
                selectedIndex={selectedIndex}
                onSelect={onSelectDay}
            />
        </section>
    );
}