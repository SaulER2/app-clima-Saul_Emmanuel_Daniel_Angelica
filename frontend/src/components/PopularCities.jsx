import React from 'react';
import "./css/PopularCities.css";
import weatherIcons from '../data/weatherIcons';

export default function PopularCities({ selectedIndex }) {
    const [popularCities, setPopularCities] = React.useState([]);

    React.useEffect(() => {
        const fetchPopularCities = async () => {
            try {
                const res = await fetch("http://localhost:9000/api/weather/popular-cities");
                if (!res.ok) throw new Error("Error al cargar ciudades populares");
                const data = await res.json();
                setPopularCities(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularCities();
        console.log(popularCities);
    }, []);

    return (
        <section>
            <article>
                <p className='localidades'>Localidades Populares</p>
            </article>
            <article className='popular-cities mobile-only' id='popular-cities'>
                {popularCities.map((city, index) => {
                    const dayForecast = city.weather["list"][selectedIndex];
                    console.log(city)
                    return (
                        <div className='popular-card' key={index}>
                            <div className='popular-card-left'>
                                <p className='popular-temp'>{dayForecast["main"].temp}°</p>
                                <p className='city-name'><i class="bi bi-geo-alt-fill"></i>{city.city}</p>
                            </div>
                            <div className='popular-card-right'>
                                <span style={{ fontSize: "6rem" }}>{weatherIcons[dayForecast["weather"][0]["icon"]]}</span>
                            </div>
                        </div>
                    );
                })}
            </article>
        </section>
    );
}