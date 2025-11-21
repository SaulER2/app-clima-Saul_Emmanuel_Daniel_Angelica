import React, { useEffect, useState, useRef } from "react";

const STORAGE_KEY = "app_profile_sample";

export default function Profile({ initialUser = null, onSave = null }) {
    const empty = { name: "", email: "", location: "", bio: "", avatarUrl: "" };
    const [user, setUser] = useState(initialUser || empty);
    const [editUser, setEditUser] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Si no vienen props, intentar cargar desde localStorage
        if (!initialUser) {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) setUser(JSON.parse(raw));
                else setUser(empty);
            } catch {
                setUser(empty);
            }
        } else {
            setUser(initialUser);
        }
    }, [initialUser]);

    useEffect(() => {
        setEditUser(user);
    }, [user]);

    function validate(u) {
        if (!u.name.trim()) return "El nombre es obligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email)) return "Correo electrónico inválido.";
        return "";
    }

    async function handleSave(e) {
        e?.preventDefault();
        setError("");
        setSuccess("");

        const v = validate(editUser);
        if (v) {
            setError(v);
            return;
        }

        setSaving(true);
        try {
            if (onSave && typeof onSave === "function") {
                // Permite al consumidor manejar persistencia
                await onSave(editUser);
            } else {
                // Simulación: guardar en localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(editUser));
                // Simular retardo
                await new Promise((r) => setTimeout(r, 400));
            }
            setUser(editUser);
            setIsEditing(false);
            setSuccess("Perfil guardado correctamente.");
        } catch (err) {
            setError("Error al guardar. Intente de nuevo.");
        } finally {
            setSaving(false);
            // limpiar mensaje de éxito en unos segundos
            setTimeout(() => setSuccess(""), 3000);
        }
    }

    function handleCancel() {
        setEditUser(user);
        setError("");
        setSuccess("");
        setIsEditing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditUser((prev) => ({ ...prev, [name]: value }));
    }

    function handleAvatarFile(e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        // Previsualizar usando FileReader
        const reader = new FileReader();
        reader.onload = () => {
            setEditUser((prev) => ({ ...prev, avatarUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    }

    // Simple styles en línea para no depender de archivos externos
    const S = {
        container: { maxWidth: 720, margin: "16px auto", padding: 16, fontFamily: "Segoe UI, Roboto, Arial", color: "#222" },
        card: { border: "1px solid #e0e0e0", borderRadius: 8, padding: 16, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
        header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 12 },
        avatar: { width: 96, height: 96, borderRadius: 8, objectFit: "cover", background: "#f5f5f5" },
        info: { flex: 1 },
        name: { fontSize: 20, fontWeight: 600, margin: 0 },
        small: { color: "#666", marginTop: 4 },
        buttons: { display: "flex", gap: 8, marginTop: 12 },
        btn: { padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer" },
        primary: { background: "#0366d6", color: "#fff", borderColor: "#0366d6" },
        danger: { background: "#e53e3e", color: "#fff", borderColor: "#e53e3e" },
        field: { display: "block", width: "100%", padding: 8, marginTop: 6, borderRadius: 6, border: "1px solid #ddd", boxSizing: "border-box" },
        label: { marginTop: 12, fontSize: 13, color: "#333" },
        note: { fontSize: 13, color: "#4caf50", marginTop: 8 },
        err: { color: "#b00020", marginTop: 8 },
    };

    return (
        <div style={S.container}>
            <div style={S.card}>
                <div style={S.header}>
                    <img
                        src={user.avatarUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='14'>Avatar</text></svg>"}
                        alt="Avatar"
                        style={S.avatar}
                    />
                    <div style={S.info}>
                        <p style={S.name}>{user.name || "Nombre no establecido"}</p>
                        <div style={S.small}>{user.email || "Correo no establecido"}</div>
                        <div style={S.small}>{user.location}</div>
                    </div>
                    <div>
                        {!isEditing ? (
                            <button
                                type="button"
                                style={{ ...S.btn, ...S.primary }}
                                onClick={() => {
                                    setIsEditing(true);
                                    setError("");
                                    setSuccess("");
                                }}
                            >
                                Editar
                            </button>
                        ) : (
                            <button type="button" style={{ ...S.btn }} onClick={handleCancel} disabled={saving}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>

                {!isEditing ? (
                    <div>
                        <h4 style={{ marginTop: 8 }}>Biografía</h4>
                        <p style={{ whiteSpace: "pre-wrap", color: "#333" }}>{user.bio || "Sin biografía."}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSave} aria-label="Formulario de edición de perfil">
                        <label style={S.label}>
                            Nombre
                            <input name="name" value={editUser.name} onChange={handleChange} style={S.field} required />
                        </label>

                        <label style={S.label}>
                            Correo
                            <input name="email" value={editUser.email} onChange={handleChange} style={S.field} type="email" required />
                        </label>

                        <label style={S.label}>
                            Ubicación
                            <input name="location" value={editUser.location} onChange={handleChange} style={S.field} />
                        </label>

                        <label style={S.label}>
                            Biografía
                            <textarea name="bio" value={editUser.bio} onChange={handleChange} style={{ ...S.field, minHeight: 100 }} />
                        </label>

                        <label style={S.label}>
                            Avatar (subir archivo)
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarFile} style={{ marginTop: 8 }} />
                        </label>

                        <label style={S.label}>
                            o URL de avatar
                            <input name="avatarUrl" value={editUser.avatarUrl} onChange={handleChange} placeholder="https://..." style={S.field} />
                        </label>

                        {editUser.avatarUrl ? (
                            <div style={{ marginTop: 12 }}>
                                <div style={{ fontSize: 13, color: "#555" }}>Previsualización</div>
                                <img src={editUser.avatarUrl} alt="Previsualización avatar" style={{ width: 120, height: 120, borderRadius: 8, marginTop: 8, objectFit: "cover" }} />
                            </div>
                        ) : null}

                        {error && <div role="alert" style={S.err}>{error}</div>}
                        {success && <div role="status" style={S.note}>{success}</div>}

                        <div style={S.buttons}>
                            <button type="submit" style={{ ...S.btn, ...S.primary }} disabled={saving}>
                                {saving ? "Guardando..." : "Guardar"}
                            </button>
                            <button type="button" style={S.btn} onClick={handleCancel} disabled={saving}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}