import { useState, useEffect } from "react";

export default function useGreeting() {
  /*const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "Hola, ¡Buenos Días!";
    if (hour >= 12 && hour < 20) return "Hola, ¡Buenas Tardes!";
    return "Hola, ¡Buenas Noches!";
  });

    useEffect(() => {
    const interval = setInterval(() => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) setGreeting("Hola, ¡Buenos Días!");
        else if (hour >= 12 && hour < 20) setGreeting("Hola, ¡Buenas Tardes!");
        else setGreeting("Hola, ¡Buenas Noches!");
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
    }, []);*/

    const [greeting, setGreeting] = useState("");
    
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) setGreeting("Hola, ¡Buenos Días!");
        else if (hour >= 12 && hour < 20) setGreeting("Hola, ¡Buenas Tardes!");
        else setGreeting("Hola, ¡Buenas Noches!");
    }, []);

    return greeting;
}