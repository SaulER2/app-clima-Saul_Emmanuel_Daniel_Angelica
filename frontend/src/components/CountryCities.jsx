import React from "react";
import "./css/CountryCities.css";
import weatherIcons from "../data/weatherIcons";

export default function CountryCities({ popularCities, selectedIndex, setCity, setLatitude, setLongitude }) {
    return (
        <>
        <p style={{ display: 'block', marginLeft: "0.5rem" }} className='localidades desktop-only'>Localidades Populares</p>
        <section className="country-cities desktop-only" id="country-cities">
            {popularCities.map((city, index) => {
                const forecast = city.weather["list"][selectedIndex * 8];
                return (
                    <article className="weather-card small" key={index} onClick={() => {
                        console.log(city);
                        setLatitude(city.weather.city.coord.lat);
                        setLongitude(city.weather.city.coord.lon);
                        setCity(city.city);
                    }}>
                        <span className="city">{city.city}</span>
                        <span className="icon">{weatherIcons[forecast["weather"][0]["icon"]]}</span>
                        <span className="temp">{Math.round(forecast["main"].temp)}°</span>
                    </article>
                );
            })}
        </section>
        </>
    );
}