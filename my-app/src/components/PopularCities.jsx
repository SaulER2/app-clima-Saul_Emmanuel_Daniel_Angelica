import React from 'react';

export default function PopularCities({popularCities, selectedIndex}) {
    return (
        <section className='popular-cities mobile-only' id='popular-cities'>
            {popularCities.map((city, index) => {
                const dayForecast = city.forecast[selectedIndex];
                return (
                    <div className='popular-card' key={index}>
                        <p className='city-name'>{city.name}</p>
                        <p className='city-icon'>{dayForecast.icon}</p>
                        <p className='popular-temp'>{dayForecast.temp}°</p>
                    </div>
                );
            })}
        </section>
    );
}