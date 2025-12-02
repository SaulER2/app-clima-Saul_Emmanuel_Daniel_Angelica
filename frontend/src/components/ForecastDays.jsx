import React, { useEffect, useState } from "react";
import "./css/ForecastDays.css";
import weatherIcons from "../data/weatherIcons";

export default function ForecastDays({ forecast, selectedIndex, onSelect, cityData, city }) {
    const [daysToShow, setDaysToShow] = useState(5);
    const selected = cityData;
    useEffect(() => {
        const updateDays = () => {
            if (window.innerWidth <= 900) {
                setDaysToShow(5);
            } else {
                setDaysToShow(10);
            }
        };

        updateDays();
        window.addEventListener("resize", updateDays);
        return () => window.removeEventListener("resize", updateDays);
    }, []);

    useEffect(() => {
        console.log("Forecast data:", forecast);
    }, [forecast]);

    const daysOfWeek = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];

    const today = new Date().getDay();

    const getDayName = (offset) => {
        return daysOfWeek[(today + offset) % 7];
    };

    return (

        <article className="forecast-days">
            {
                forecast.list && forecast.list.map((item, index) => {
                    if (index % 8 === 0 && index / 8 < daysToShow) {
                        const dayIndex = index / 8;
                        return (
                            <button
                                key={index}
                                onClick={() => onSelect(dayIndex)}
                                className={(selectedIndex === dayIndex ? "active" : "") + " day-pill"}
                                title={`${getDayName(dayIndex)} - ${Math.round(item.main.temp)}°`}
                            >
                                <div className="day-label">
                                    {dayIndex === 0 ? "Hoy" : getDayName(dayIndex)}
                                </div>
                                <div className="day-icon">
                                    {console.log(getDayName(dayIndex), item.weather[0].icon)}
                                    <span style={{ fontSize: "3rem" }}>{weatherIcons[item.weather[0].icon]}</span>
                                </div>
                                <div className="day-temp">
                                    {Math.round(item.main.temp)}°
                                </div>
                            </button>
                        );
                    }
                    return null;
                })
            }
            {/*forecast.slice(0, daysToShow).map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(index)}
                        className={(selectedIndex === index ? "active" : "") + " day-pill"}
                        title={`${getDayName(index)} - ${item.temp}°`}
                    >
                        <div className="day-label">
                            {index === 0 ? "Hoy" : getDayName(index)}
                        </div>
                        <div className="day-icon">{item.icon}</div>
                        <div className="day-temp">{item.temp}°</div>
                    </button>
                ))*/}
        </article>

    );
}
