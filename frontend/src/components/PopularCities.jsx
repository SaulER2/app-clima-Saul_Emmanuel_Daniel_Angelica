import React from 'react';
import "./css/PopularCities.css";

export default function PopularCities({ popularCities, selectedIndex }) {



    return (
        <section>
            <article>
                <p className='localidades'>Localidades Populares</p>
            </article>
            <article className='popular-cities mobile-only' id='popular-cities'>
                {popularCities.map((city, index) => {
                    const dayForecast = city.forecast[selectedIndex];
                    return (
                        <div className='popular-card' key={index}>
                            <div className='popular-card-left'>
                                <p className='popular-temp'>{dayForecast.temp}°</p>
                                <p className='city-name'>{city.name}</p>
                            </div>
                            <div className='popular-card-right'>
                                <p className='city-icon'>{dayForecast.icon}</p>
                            </div>
                        </div>
                    );
                })}
            </article>
        </section>
    );
}