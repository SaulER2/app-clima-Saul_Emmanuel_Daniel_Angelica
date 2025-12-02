import React, { useEffect, useState } from "react";

export default function Favorites({ onSelectFavorite }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:9000/api/favorites";
    const token = localStorage.getItem("auth_token"); // ← CORREGIDO

    // Cargar favoritos desde API
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const res = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (!res.ok) {
                    console.error("Error al obtener favoritos", await res.text());
                    setFavorites([]);
                } else {
                    const data = await res.json();
                    setFavorites(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error("Error de red:", e);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // Eliminar favorito mediante API
    const removeFavorite = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setFavorites((prev) => prev.filter((f) => f.id !== id));
            } else {
                console.error("Error al eliminar favorito");
            }
        } catch (e) {
            console.error("Error de red:", e);
        }
    };

    // Ver favorito
    const handleView = (fav) => {
        if (onSelectFavorite) return onSelectFavorite(fav);

        localStorage.setItem("selectedFavorite", JSON.stringify(fav));
        window.location.href = "/";
    };

    if (loading) {
        return <div style={styles.container}>Cargando favoritos...</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Favoritos</h1>

            {favorites.length === 0 ? (
                <div style={styles.empty}>Aún no tienes favoritos.</div>
            ) : (
                <>
                    <ul style={styles.list}>
                        {favorites.map((f) => (
                            <li key={f.id} style={styles.item}>
                                {console.log(f)}
                                <div style={styles.info}>
                                    <strong>{f.name}</strong>
                                    <div style={styles.coords}>
                                        {Number(f.latitude).toFixed(3)}, {Number(f.longitude).toFixed(3)}
                                    </div>
                                </div>

                                <div style={styles.actions}>
                                    <button style={styles.viewBtn} onClick={() => handleView(f)}>
                                        Ver
                                    </button>
                                    <button style={styles.delBtn} onClick={() => removeFavorite(f.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div style={styles.footer}>
                        <span style={styles.count}>{favorites.length} favorito(s)</span>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 820,
        margin: "24px auto",
        padding: 16,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
    },
    title: { marginBottom: 12 },
    empty: { padding: 20, background: "#f8f9fa", borderRadius: 6, color: "#555" },
    list: { listStyle: "none", padding: 0, margin: 0 },
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 10px",
        borderBottom: "1px solid #eee",
    },
    info: { display: "flex", flexDirection: "column" },
    coords: { color: "#888", fontSize: 12, marginTop: 4 },
    actions: { display: "flex", gap: 8 },
    viewBtn: {
        padding: "6px 10px",
        background: "#0d6efd",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },
    delBtn: {
        padding: "6px 10px",
        background: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },
    footer: {
        marginTop: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    count: { color: "#444" },
};