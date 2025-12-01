import React, { useState } from "react";
import "./css/WeatherToday.css";
import ForecastDays from "./ForecastDays";

export default function WeatherToday({ cityData, selectedIndex, onSelectDay, forecast, city, darkMode, latitude, longitude }) {
    const selected = cityData.forecast[selectedIndex];
    const [isFavorite, setIsFavorite] = useState(false);
    console.log(cityData);
    const mainSectionClass = `weather-today ${darkMode ? "" : "weather-today-light"}`;

    const handleAddFavorite = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(latitude, longitude, 'city')

            const res = await fetch("http://localhost:9000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: city,
                    lat: latitude,
                    lon: longitude,
                }),
            });

            if (!res.ok) {
                throw new Error("Error al guardar favorito");
            }

            setIsFavorite(true);
            console.log("Ciudad guardada como favorita");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={mainSectionClass}>
            <article className="current-weather">
                <div className="current-left">
                    <span className="big-icon">
                        {forecast.list && (
                            <img
                                src={`https://openweathermap.org/img/wn/${forecast.list[selectedIndex * 8].weather[0].icon}@2x.png`}
                                alt={forecast.list[selectedIndex * 8].weather[0].description}
                            />
                        )}
                    </span>

                    <div className="location">
                        <h2>
                            <span className="place">{city}</span>
                        </h2>

                        <span className="description">
                            {forecast.list && forecast.list[selectedIndex * 8].weather[0].description}
                        </span>
                    </div>
                </div>

                <div className="current-right">
                    <span className="temp-now">
                        {forecast.list && Math.round(forecast.list[selectedIndex * 8].main.temp)}°
                    </span>

                    {/* ⭐ Botón de favoritos */}
                    <button
                        className="favorite-btn"
                        onClick={handleAddFavorite}
                        disabled={isFavorite}
                    >
                        {isFavorite ? "⭐ Guardado" : "☆ Guardar"}
                    </button>
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