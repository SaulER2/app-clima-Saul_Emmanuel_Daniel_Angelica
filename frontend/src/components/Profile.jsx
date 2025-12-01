import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:9000/api";
const TOKEN_KEY = "auth_token";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

    // ============================
    //      CARGAR USUARIO
    // ============================
    async function loadUser() {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            setLoadingUser(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("No autenticado");

            const data = await res.json();
            setUser(data);
        } catch {
            localStorage.removeItem(TOKEN_KEY);
        } finally {
            setLoadingUser(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    // ============================
    //         LOGIN
    // ============================
    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.message || "Error en login");
            }

            const body = await res.json();
            localStorage.setItem(TOKEN_KEY, body.token);
            await loadUser();
        } catch (err) {
            setError(err.message);
        }
    }

    // ============================
    //        REGISTRO
    // ============================
    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });

            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.message || "Error en registro");
            }

            const body = await res.json();
            localStorage.setItem(TOKEN_KEY, body.token);
            await loadUser();
        } catch (err) {
            setError(err.message);
        }
    }

    // ============================
    //        LOGOUT
    // ============================
    async function handleLogout() {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return;

        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setShowRegister(false);
    }

    if (loadingUser) return <p style={{ textAlign: "center" }}>Cargando...</p>;

    const styles = {
        container: { maxWidth: 400, margin: "40px auto", padding: 20, fontFamily: "Arial, sans-serif", color: "#333" },
        card: { background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 20 },
        heading: { marginBottom: 12, color: "#222", textAlign: "center" },
        input: { width: "100%", padding: 10, marginBottom: 12, borderRadius: 6, border: "1px solid #ccc", fontSize: 14, boxSizing: "border-box" },
        button: { width: "100%", padding: "10px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: 15 },
        primary: { background: "#0366d6", color: "#fff", marginBottom: 10 },
        link: { background: "none", color: "#0366d6", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: 14 },
        error: { color: "#b00020", marginBottom: 12 },
        userInfo: { marginTop: 10, lineHeight: 1.6 },
    };

    return (
        <div style={styles.container}>
            {error && <div style={styles.error}>{error}</div>}

            {!user ? (
                <div style={styles.card}>
                    <h3 style={styles.heading}>{showRegister ? "Registrarse" : "Iniciar Sesión"}</h3>

                    {!showRegister ? (
                        <>
                            <form onSubmit={handleLogin}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                                <button type="submit" style={{ ...styles.button, ...styles.primary }}>Ingresar</button>
                            </form>
                            <button style={styles.link} onClick={() => setShowRegister(true)}>
                                ¿No tienes cuenta? Registrarse
                            </button>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleRegister}>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={registerData.name}
                                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                                <button type="submit" style={{ ...styles.button, ...styles.primary }}>Registrarme</button>
                            </form>
                            <button style={styles.link} onClick={() => setShowRegister(false)}>
                                ¿Ya tienes cuenta? Iniciar sesión
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div style={styles.card}>
                    <h3 style={styles.heading}>Bienvenido, {user.name}</h3>
                    <div style={styles.userInfo}>
                        <p><b>Email:</b> {user.email}</p>
                        {user.location && <p><b>Ubicación:</b> {user.location}</p>}
                        {user.bio && <p><b>Biografía:</b> {user.bio}</p>}
                    </div>
                    <button style={{ ...styles.button, ...styles.primary }} onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}
