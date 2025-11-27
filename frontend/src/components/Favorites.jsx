import React, { useEffect, useState } from "react";

export default function Favorites({ onSelectFavorite }) {
    const [favorites, setFavorites] = useState([]);

    // Cargar favoritos desde localStorage
    useEffect(() => {
        const raw = localStorage.getItem("favorites");
        try {
            const parsed = raw ? JSON.parse(raw) : [];
            setFavorites(Array.isArray(parsed) ? parsed : []);
        } catch {
            setFavorites([]);
        }

        // Si otros pestañas cambian los favoritos, actualizar la vista
        const handleStorage = (e) => {
            if (e.key === "favorites") {
                try {
                    const parsed = e.newValue ? JSON.parse(e.newValue) : [];
                    setFavorites(Array.isArray(parsed) ? parsed : []);
                } catch {
                    setFavorites([]);
                }
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const saveFavorites = (next) => {
        setFavorites(next);
        localStorage.setItem("favorites", JSON.stringify(next));
    };

    const removeFavorite = (idOrIndex) => {
        const next = favorites.filter((f, i) =>
            // si hay id, comparar por id; si no, por índice
            f && (f.id !== undefined ? f.id !== idOrIndex : i !== idOrIndex)
        );
        saveFavorites(next);
    };

    const clearFavorites = () => {
        if (!favorites.length) return;
        if (window.confirm("¿Eliminar todos los favoritos?")) {
            setFavorites([]);
            localStorage.removeItem("favorites");
        }
    };

    const handleView = (fav) => {
        if (typeof onSelectFavorite === "function") {
            onSelectFavorite(fav);
            return;
        }
        // Fallback: guardar seleccionado y navegar a inicio
        try {
            localStorage.setItem("selectedFavorite", JSON.stringify(fav));
        } catch {}
        // Ajusta la ruta si tu app usa otra
        window.location.href = "/";
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Favoritos</h1>

            {favorites.length === 0 ? (
                <div style={styles.empty}>Aún no tienes favoritos.</div>
            ) : (
                <>
                    <ul style={styles.list}>
                        {favorites.map((f, i) => {
                            const key = f && f.id !== undefined ? f.id : i;
                            return (
                                <li key={key} style={styles.item}>
                                    <div style={styles.info}>
                                        <strong>{f?.name || "Sin nombre"}</strong>
                                        {f?.country ? <span style={styles.meta}> — {f.country}</span> : null}
                                        {f?.lat !== undefined && f?.lon !== undefined ? (
                                            <div style={styles.coords}>
                                                {f.lat.toFixed?.(3) ?? f.lat}, {f.lon.toFixed?.(3) ?? f.lon}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div style={styles.actions}>
                                        <button style={styles.viewBtn} onClick={() => handleView(f)}>
                                            Ver
                                        </button>
                                        <button style={styles.delBtn} onClick={() => removeFavorite(f.id ?? i)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div style={styles.footer}>
                        <button style={styles.clearBtn} onClick={clearFavorites}>
                            Eliminar todos
                        </button>
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
    meta: { color: "#666", fontWeight: 400, marginLeft: 6 },
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
    clearBtn: {
        padding: "6px 10px",
        background: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },
    count: { color: "#444" },
};