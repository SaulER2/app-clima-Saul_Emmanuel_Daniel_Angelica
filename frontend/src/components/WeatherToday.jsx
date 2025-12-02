import React, { useEffect, useState } from "react";
import "./css/WeatherToday.css";
import ForecastDays from "./ForecastDays";
import weatherIcons from "../data/weatherIcons";

export default function WeatherToday({ cityData, favorites, selectedIndex, onSelectDay, forecast, city, darkMode, latitude, longitude }) {
    const selected = cityData.forecast[selectedIndex];
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const mainSectionClass = `weather-today ${darkMode ? "" : "weather-today-light"}`;

    useEffect(() => {
        // Comprobar si la ciudad ya está en favoritos
        const checkFavorite = () => {
                const found = favorites.some(fav => fav.name === city);
                setIsFavorite(found);
                if (found) {
                    setFavoriteId(favorites.find(fav => fav.name === city).id);
                }
        };

        checkFavorite();
    }, [city, favorites]);

    const handleAddFavorite = async () => {
        try {
            const token = localStorage.getItem("auth_token");

            if(isFavorite) {
                // Eliminar de favoritos
                const res = await fetch(`http://localhost:9000/api/favorites/${favoriteId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Error al eliminar favorito");
                }

                setIsFavorite(false);
                setFavoriteId(null);
                console.log("Ciudad eliminada de favoritos");
                return;
            }
            const res = await fetch("http://localhost:9000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    name: city,
                    latitude: latitude,
                    longitude: longitude,
                }),
            });

            if (!res.ok) {
                throw new Error("Error al guardar favorito");
            }

            setIsFavorite(true);
            setFavoriteId((await res.json()).id);
            console.log("Ciudad guardada como favorita");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={mainSectionClass}>
            {console.log("Rendering WeatherToday for city:", city, forecast)}
            <article className="current-weather">
                <div className="current-left">
                    <span className="big-icon" style={{ fontSize: "4rem" }}>
                        {forecast.list && (
                            weatherIcons[forecast.list[selectedIndex * 8].weather[0].icon]
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
                    >
                        {!isFavorite && <i data-isfavorite={isFavorite} class="bi bi-heart"></i>}
                        <i style={{ opacity: isFavorite ? 1 : 0 }} data-isfavorite={isFavorite} class="bi bi-heart-fill"></i>
                        {isFavorite && <i class="bi bi-heartbreak-fill"></i>}
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