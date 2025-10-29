import React from "react";

export default function Footer({ view, goTo, favoritesCount, darkMode, toggleTheme }) {
    return (
        <>
            <nav className="bottom-nav mobile-only">
                <button className={`nav-btn ${view === "home" ? "active" : ""}`} onClick={() => goTo("home")}>
                    <img src={`https://img.icons8.com/ios/50/${darkMode ? "ffffff" : "000000"}/home.png`} alt="home" />
                    <span>Home</span>
                </button>

                <button className={`nav-btn ${view === "favorites" ? "active" : ""}`} onClick={() => goTo("favorites")}>
                    <img src={`https://img.icons8.com/ios/50/${darkMode ? "ffffff" : "000000"}/like--v1.png`} alt="favorites" />
                    <span>Favs ({favoritesCount})</span>
                </button>

                <button className={`nav-btn ${view === "profile" ? "active" : ""}`} onClick={() => goTo("profile")}>
                    <img src={`https://img.icons8.com/ios/50/${darkMode ? "ffffff" : "000000"}/user.png`} alt="profile" />
                    <span>Perfil</span>
                </button>

                <button className="nav-btn" onClick={toggleTheme}>
                    <img src={`https://img.icons8.com/ios/50/${darkMode ? "ffffff" : "000000"}/${darkMode ? "moon" : "sun"}.png`} alt="theme"/>
                    <span>Theme</span>
                </button>
            </nav>

            <footer className="desktop-only footer-info">
                <p>© 2025 WeatherNow - Todos los derechos reservados</p>
            </footer>
        </>
    );
}