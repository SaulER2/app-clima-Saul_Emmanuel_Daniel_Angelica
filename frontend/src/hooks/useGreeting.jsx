import { useState, useEffect } from "react";

export default function useGreeting() {

    const [greeting, setGreeting] = useState("");
    
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) setGreeting("Hola, ¡Buenos Días!");
        else if (hour >= 12 && hour < 20) setGreeting("Hola, ¡Buenas Tardes!");
        else setGreeting("Hola, ¡Buenas Noches!");
    }, []);

    return greeting;
}