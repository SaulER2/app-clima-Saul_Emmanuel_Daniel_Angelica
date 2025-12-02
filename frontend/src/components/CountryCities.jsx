import React from "react";
import "./css/CountryCities.css";
import weatherIcons from "../data/weatherIcons";

export default function CountryCities({ cities, selectedIndex }) {
    const [popularCities, setPopularCities] = React.useState([]);

    React.useEffect(() => {
        const fetchPopularCities = async () => {
            try {
                const res = await fetch("http://localhost:9000/api/weather/popular-cities");
                const data = await res.json();
                setPopularCities(data);
            } catch (error) {
                console.error("Error fetching popular cities:", error);
            }
        };

        fetchPopularCities();
    }, []);

    return (
        <section className="country-cities desktop-only" id="country-cities">
            {popularCities.map((city, index) => {
                const forecast = city.weather["list"][selectedIndex];
                return (
                    <article className="weather-card small" key={index}>
                        <span className="city">{city.city}</span>
                        <span className="icon">{weatherIcons[forecast["weather"][0]["icon"]]}</span>
                        <span className="temp">{forecast["main"].temp}°</span>
                    </article>
                );
            })}
        </section>
    );
}