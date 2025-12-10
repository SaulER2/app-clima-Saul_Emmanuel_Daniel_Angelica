import { useState, createContext, useContext, useEffect } from 'react'
import Header from './components/Header.jsx'
import WeatherToday from './components/WeatherToday.jsx'
import PopularCities from './components/PopularCities.jsx'
import MapAndDetails from './components/MapAndDetails.jsx'
import CountryCities from './components/CountryCities.jsx'
import Profile from './components/Profile.jsx'
import Favorites from './components/Favorites.jsx'
import Footer from './components/Footer.jsx'
import { weatherData } from "./data/WeatherData"
import './App.css';

const WeatherContext = createContext(null);

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState("home");
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState('')
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [popularCities, setPopularCities] = useState([]);

  async function fetchPopularCities() {
      try {
          const res = await fetch("http://localhost:9000/api/weather/popular-cities");
          if (!res.ok) throw new Error("Error al cargar ciudades populares");
          const data = await res.json();
          setPopularCities(data);
      } catch (error) {
          console.error(error);
      }
  };
  function getForecast(latitude, longitude) {
        fetch(`http://localhost:9000/api/weather/forecast?lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            setForecast(data)
            setLatitude(latitude)
            setLongitude(longitude)
          });
  }

  useEffect(() => {
    getForecast(latitude, longitude);
    const input = document?.querySelector('gmp-place-autocomplete')?.shadowRoot?.querySelector("input")
    if(!input?.value){
      if(input) {
        input.value = city
      }
    }
  }, [city]);

  useEffect(() => {
    fetchPopularCities();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geolocation position:", position, "app");
        getForecast(latitude, longitude);
      });
    } else {
      console.log("Geolocalización no está disponible");
    }

    // Cargar favoritos desde el backend
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        const res = await fetch("http://localhost:9000/api/favorites", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Error al cargar favoritos");
        }

        const favoritesData = await res.json();
        setFavorites(favoritesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFavorites();
  }, []);

  const toggleTheme = () => setDarkMode((s) => !s);
  const goTo = (v) => setView(v);

  function handleCityChange(name) {
    console.log("Buscar ciudad:", name);
  }

  const cityData = weatherData.currentCity;
  const countryCities = weatherData.countryCities;

  const toggleFavorite = (cityName) =>
    setFavorites((prev) =>
      prev.includes(cityName) ? prev.filter((name) => name !== cityName) : [...prev, cityName]
    );

  return (
    <div className={darkMode ? "app dark-mode" : "app light-mode"}>
      <Header
        setCity={setCity}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setForecast={setForecast}
        onCityChange={handleCityChange}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        goTo={goTo}
      />


      <main className="main-content">
        {view === "home" && (
          <>
            <WeatherToday
              cityData={cityData}
        latitude={latitude}
        longitude={longitude}
              city={city}
              forecast={forecast}
              favorites={favorites}
              selectedIndex={selectedIndex}
              onSelectDay={setSelectedIndex}
              darkMode={darkMode}
            />

            <MapAndDetails forecast={forecast} latitude={latitude} longitude={longitude} selectedIndex={selectedIndex} />

            <PopularCities popularCities={popularCities} selectedIndex={selectedIndex} setCity={setCity} setLatitude={setLatitude} setLongitude={setLongitude} />

            <CountryCities popularCities={popularCities} cities={countryCities} selectedIndex={selectedIndex} setCity={setCity} setLatitude={setLatitude} setLongitude={setLongitude} />

          </>
        )}

        {view === "favorites" && (
          <Favorites />
        )}

        {view === "profile" && (
          <Profile />
        )}
      </main>
      <Footer
        view={view}
        goTo={goTo}
        favoritesCount={favorites.length}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}
export default App
