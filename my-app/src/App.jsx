import { useState } from 'react'
import Header from './components/Header.jsx'
import WeatherToday from './components/WeatherToday.jsx'
import PopularCities from './components/PopularCities.jsx'
import CountryCities from './components/CountryCities.jsx'
import MapAndDetails from './components/MapAndDetails.jsx'
import Footer from './components/Footer.jsx'
import { weatherData } from "./data/WeatherData";
import './App.css'

function App() {
  
  const [currentCityKey, setCurrentCityKey] = useState("currentCity");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState("home");
  const [favorites, setFavorites] = useState([]);

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
      <Header onCityChange={handleCityChange} darkMode={darkMode} toggleTheme={toggleTheme} goTo={goTo} />
      
      <main className="main-content">
        {view === "home" && (
        <>
          <WeatherToday
            cityData={cityData}
            selectedIndex={selectedIndex}
            onSelectDay={setSelectedIndex}
          />

          <MapAndDetails cityData={cityData} selectedIndex={selectedIndex} />
          
          <PopularCities popularCities={popularCities} selectedIndex={selectedIndex} />

          <CountryCities cities={countryCities} selectedIndex={selectedIndex} />

        </>
        )}

        {view === "favorites" && (
          <section className="favorites-view">
            <h2>Ciudades Favoritas</h2>
            {favorites.length === 0 ? (
              <p>No tienes ciudades favoritas aún.</p>
            ) : (
              <div className="favorites-grid">
                {favorites.map((city, index) => (
                  <div className="weather-card" key={index}>
                    <span className="city">{city}</span>
                    <span className="icon">-</span>
                    <span className="temp">-</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
        
        {view === "profile" && (
          <section className="profile-view">
            <h2>Perfil de Usuario</h2>
            <p>Opciones de configuración</p>
            <button onClick={() => alert("Aquí se cambiaran las configuraciones")}>Editar Perfil</button>
          </section>
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
