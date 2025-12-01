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

  const [currentCityKey, setCurrentCityKey] = useState("currentCity");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState("home");
  const [favorites, setFavorites] = useState([]);
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState('')
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    console.log("Requesting geolocation...");
    fetch
    if ("geolocation" in navigator) {
      console.log('geo')
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`http://localhost:9000/api/weather/forecast?lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            setForecast(data)
            setLatitude(latitude)
            setLongitude(longitude)
          });
      });
    } else {
      console.log("Geolocalización no está disponible");
    }
  }, []);

  const toggleTheme = () => setDarkMode((s) => !s);
  const goTo = (v) => setView(v);

  function handleCityChange(name) {
    console.log("Buscar ciudad:", name);
  }

  const cityData = weatherData.currentCity;
  const popularCities = weatherData.popularCities;
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
              selectedIndex={selectedIndex}
              onSelectDay={setSelectedIndex}
              darkMode={darkMode}
            />

            <MapAndDetails forecast={forecast} latitude={latitude} longitude={longitude} selectedIndex={selectedIndex} />

            <PopularCities popularCities={popularCities} selectedIndex={selectedIndex} />

            <CountryCities cities={countryCities} selectedIndex={selectedIndex} />

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
