import React from 'react';

export default function MapAndDetails({ cityData, selectedIndex }) {
    const selected = cityData.forecast[selectedIndex];
    return (
        <div className='map-info-container desktop-only'>
            <div className='map-placeholder'>
                <img className='map-box' src="./mapa.png" alt="mapa" />
            </div>
            <div className='weather-details'>
                <h3>Detalles</h3>
                <div className='weather-details-row'>
                    <span>Viento: {selected.wind}</span>
                </div>
                <div className='weather-details-row'>
                    <span>Ráfagas: {selected.gusts}</span>
                </div>
                <div className='weather-details-row'>
                    <span>Calidad del aire: {selected.air}</span>
                </div>
            </div>
        </div>
    );
}