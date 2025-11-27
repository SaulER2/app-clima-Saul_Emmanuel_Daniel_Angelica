import React, { useState, useRef, useEffect } from "react";
import { weatherData } from "../data/WeatherData";
import "./css/SearchBar.css";

export default function SearchBar({ onCityChange, setForecast, setCity, setLatitude, setLongitude }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const suggestions = weatherData.allCities.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);

    }
    (async () => {
      // Request needed libraries.
      await google.maps.importLibrary("places");
      // Create the input HTML element, and append it.
      const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({});
      ref.current.innerHTML = "";
      ref.current.appendChild(placeAutocomplete);
      placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });
        const placeJson = place.toJSON();
        setCity(placeJson.displayName);
        console.log(placeJson);
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${place.location.lat()}&lon=${place.location.lng()}&units=metric&lang=es&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
          .then(response => response.json())
          .then(data => setForecast(data))
          .then(setLatitude(place.location.lat))
          .then(setLongitude(place.location.lng))
      });

      const geocoder = new google.maps.Geocoder();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                // get locality from results[0]
                const locality = results[0].address_components.find(component => component.types.includes("locality"));
                setCity(locality.long_name)
                console.log(locality)
                ref.current.querySelector('gmp-place-autocomplete').shadowRoot.querySelector('input').value = locality.long_name
              } else {
                console.log("No se encontraron resultados");
              }
            } else {
              console.log("Error en la geocodificación:", status);
            }
          });
        });
      }
    })();
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="searchbar-custom" ref={ref}>

      {/*<input
        className="search-input"
        placeholder="Buscar ciudad"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul className="dropdown">
          {suggestions.length === 0 && <li className="noresult">Sin resultados</li>}
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="dropdown-item"
              onClick={() => {
                setQuery(s);
                setOpen(false);
                if (onCityChange) onCityChange(s.split(",")[0]);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}*/}
    </div>
  );
}