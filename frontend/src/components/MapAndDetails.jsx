import React, { useEffect, useState } from 'react';
import "./css/MapAndDetails.css";

export default function MapAndDetails({ cityData, selectedIndex, forecast, latitude, longitude }) {
    console.log(forecast)
    const selected = "list" in forecast ? forecast.list[selectedIndex] : {};
    const lat = latitude ?? forecast?.city?.coord?.lat;
    const lon = longitude ?? forecast?.city?.coord?.lon;
    console.log(selected);
    console.log(lat, lon);
    return (
        <section className='map-info-container desktop-only'>
            <article className='map-placeholder'>
                <iframe src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&q=${lat},${lon}&zoom=5`} />
            </article>
            <article className='weather-details'>
                <h3>Detalles</h3>
                <div className='weather-details-row'>
                    <span>Viento: {selected?.wind?.speed}</span>
                </div>
                <div className='weather-details-row'>
                    <span>Ráfagas: {selected?.wind?.gust}</span>
                </div>
                <div className='weather-details-row'>
                    Calidad del aire:&nbsp;
                    <span className={
                        selected?.main?.pressure > 1000 ? "air-good" :
                            selected?.main?.pressure > 1000 ? "air-moderate" :
                                selected?.main?.pressure > 1000 ? "air-bad" : ""
                    }>
                        {selected?.main?.pressure > 1000 ? "Buena" : "Mala"}
                    </span>
                </div>
            </article>
        </section>
    );
}