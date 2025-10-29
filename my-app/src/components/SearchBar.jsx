import React, { useState, useRef, useEffect } from "react";
import { weatherData } from "../data/WeatherData";

export default function SearchBar({ onCityChange }) {
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
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="searchbar-custom" ref={ref}>
      <span>🔍</span>
      <input
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
      )}
    </div>
  );
}