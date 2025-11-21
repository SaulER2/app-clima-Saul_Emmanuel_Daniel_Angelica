import React from "react";

export default function CountryCities({ cities, selectedIndex }) {
    return (
        <section className="country-cities desktop-only" id="country-cities">
            {cities.map((city, index) => {
                const forecast = city.forecast[selectedIndex];
                return (
                    <article className="weather-card small" key={index}>
                        <span className="city">{city.name}</span>
                        <span className="icon">{forecast.icon}</span>
                        <span className="temp">{forecast.temp}°</span>
                    </article>
                );
            })}
        </section>
    );
}
