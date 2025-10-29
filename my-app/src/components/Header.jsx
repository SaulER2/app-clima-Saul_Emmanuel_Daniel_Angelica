import React from "react";
import useGreeting from "../hooks/useGreeting";
import SearchBar from "./SearchBar";

export default function Header({ onCityChange, darkMode, toggleTheme, goTo }) {
    const greeting = useGreeting();
    return (
        <header className={`header ${darkMode ? "dark" : "light"}`}>
            <div className="header-left">
                <button className="icon-btn home-btn desktop-only" onClick={() => goTo("home")} title="Home">
                    <img src={`https://img.icons8.com/ios/30/${darkMode ? "ffffff" : "000000"}/home.png`} alt="home" />
                </button>
                <h1 className="greeting">{greeting}</h1>
            </div>

            <div className="header-right">
                <button className="icon-btn profile-btn desktop-only" onClick={() => goTo("profile")} title="Perfil">
                    <img src={`https://img.icons8.com/ios/30/${darkMode ? "ffffff" : "000000"}/user.png`} alt="profile" />
                </button>
                <div className="header-actions">
                    <SearchBar onCityChange={onCityChange}/>
                </div>
                <button className="icon-btn theme-btn desktop-only" onClick={toggleTheme} title="Cambiar tema">
                     {darkMode ? "🌙" : "☀️"}
                </button>
            </div>

        </header>
    );
}

             

