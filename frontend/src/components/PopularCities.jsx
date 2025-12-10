import React from 'react';
import "./css/PopularCities.css";
import weatherIcons from '../data/weatherIcons';

export default function PopularCities({ popularCities, selectedIndex, setLatitude, setLongitude, setCity }) {

    return (
        <section style={{ paddingBottom: "2rem" }}>
            <p className='localidades'>Localidades Populares</p>
            <article className='popular-cities mobile-only' id='popular-cities'>
                {popularCities.map((city, index) => {
                    const dayForecast = city.weather["list"][selectedIndex * 8];
                    return (
                        <div className='popular-card' key={index} onClick={() => {
                            setLatitude(city.weather.city.coord.lat);
                            setLongitude(city.weather.city.coord.lon);
                            setCity(city.city);
                        }}>
                            <div className='popular-card-left'>
                                <p className='popular-temp'>{Math.round(dayForecast["main"].temp)}°</p>
                                <p className='city-name'><i class="bi bi-geo-alt-fill" style={{ paddingRight: "8px" }}></i>{city.city}</p>
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