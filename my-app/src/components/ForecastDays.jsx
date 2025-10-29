import React, { useEffect, useState } from "react";

export default function ForecastDays({ forecast, selectedIndex, onSelect }) {
    const [daysToShow, setDaysToShow] = useState(5);

    // Detecta el tamaño de pantalla y ajusta el número de días
    useEffect(() => {
        const updateDays = () => {
            if (window.innerWidth <= 814) {
                setDaysToShow(5);  // Vista móvil
            } else {
                setDaysToShow(10); // Vista escritorio
            }
        };

        updateDays(); // Se ejecuta al montar
        window.addEventListener("resize", updateDays); // Se actualiza al redimensionar
        return () => window.removeEventListener("resize", updateDays);
    }, []);

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
        <div className="forecast-days">
            {forecast.slice(0, daysToShow).map((item, index) => (
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
            ))}
        </div>
    );
}
