import React, { useEffect, useState } from 'react';
import "./css/MapAndDetails.css";

export default function MapAndDetails({ cityData, selectedIndex, forecast, latitude, longitude }) {
    const selected = "list" in forecast ? forecast.list[selectedIndex] : {};
    const lat = latitude ?? forecast?.city?.coord?.lat;
    const lon = longitude ?? forecast?.city?.coord?.lon;
    return (
        <section className='map-info-container desktop-only'>
            <article className='map-placeholder'>
                <iframe src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&q=${lat},${lon}&zoom=5`} />
            </article>
            <article className='weather-details'>
                <div className='weather-details-row'>
                    <span>Viento: </span>
                    <span>{selected?.wind?.speed} Km/h</span>
                </div>
                <div className='weather-details-row'>
                    <span>Ráfagas: </span>
                    <span>{selected?.wind?.gust} Km/h</span>
                </div>
                <div className='weather-details-row'>
                    <span>
                    Calidad del aire:&nbsp;
                    </span>
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