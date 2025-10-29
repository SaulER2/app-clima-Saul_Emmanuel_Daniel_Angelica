import React from 'react';

export default function MapAndDetails({ cityData, selectedIndex }) {
    const selected = cityData.forecast[selectedIndex];
    return (
        <section className='map-info-container desktop-only'>
            <article className='map-placeholder'>
                <img className='map-box' src="./mapa.png" alt="mapa" />
            </article>
            <article className='weather-details'>
                <h3>Detalles</h3>
                <div className='weather-details-row'>
                    <span>Viento: {selected.wind}</span>
                </div>
                <div className='weather-details-row'>
                    <span>Ráfagas: {selected.gusts}</span>
                </div>
                <div className='weather-details-row'>
                    Calidad del aire:&nbsp;
                    <span className={
                        selected.air === "Buena" ? "air-good" :
                        selected.air === "Moderada" ? "air-moderate" :
                        selected.air === "Mala" ? "air-bad" : ""
                    }>
                         {selected.air}
                    </span>
                </div>
            </article>
        </section>
    );
}