# WeatherApp

Una aplicación meteorológica responsive desarrollada en React, que simula el pronóstico del clima utilizando datos locales en formato JSON. La app adapta su diseño según la pantalla (móvil o escritorio) y permite seleccionar días para actualizar el pronóstico de la ciudad actual y localidades populares.

## Características

* Vista responsive: móvil y escritorio con distintos layouts.

* Saludo dinámico según la hora del día: Buenos días, Buenas tardes, Buenas noches.

* Selección de día de pronóstico para actualizar automáticamente:

* Ciudad principal.

* Localidades populares.

* Ciudades del mismo país.

* Footer y header con botones interactivos: Home, Favoritos, Perfil, Dark/Light Mode.

* Íconos que cambian de color automáticamente según el tema.

* Simulación de datos de clima mediante JSON u objetos locales (sin backend).

* Pronósticos diarios y semanales con iconos, temperatura, y detalles adicionales (viento, ráfagas, calidad del aire).

* Compatibilidad con 10 días de pronóstico en escritorio y 5 días en móvil.

## Tecnologías

* React

* CSS / Responsive Design

* JSON para datos simulados

* Icons8 para íconos dinámicos

* JavaScript ES6+


## Uso

* Seleccionar un día: Haz click en los botones del pronóstico (ForecastDays) para actualizar    automáticamente el clima de la ciudad principal, las localidades populares y las ciudades del país.

* Cambiar tema: Usa el botón de Dark/Light Mode en el footer para alternar entre temas. Los íconos cambian de color según el modo.

* Navegación:
Home: Regresa a la vista principal.
Favoritos: Muestra las ciudades marcadas como favoritas.
Perfil: Accede a la configuración del usuario.

* Responsive: La app ajusta automáticamente la cantidad de días visibles:
Móvil: 5 días
Escritorio: 10 días

# WeatherApp

Una aplicación meteorológica responsive desarrollada en React, que simula el pronóstico del clima utilizando datos locales en formato JSON. La app adapta su diseño según la pantalla (móvil o escritorio) y permite seleccionar días para actualizar el pronóstico de la ciudad actual y localidades populares.

## Características

* Vista responsive: móvil y escritorio con distintos layouts.

* Saludo dinámico según la hora del día: Buenos días, Buenas tardes, Buenas noches.

* Selección de día de pronóstico para actualizar automáticamente:

* Ciudad principal.

* Localidades populares.

* Ciudades del mismo país.

* Footer y header con botones interactivos: Home, Favoritos, Perfil, Dark/Light Mode.

* Íconos que cambian de color automáticamente según el tema.

* Simulación de datos de clima mediante JSON u objetos locales (sin backend).

* Pronósticos diarios y semanales con iconos, temperatura, y detalles adicionales (viento, ráfagas, calidad del aire).

* Compatibilidad con 10 días de pronóstico en escritorio y 5 días en móvil.

## Tecnologías

* React

* CSS / Responsive Design

* JSON para datos simulados

* Icons8 para íconos dinámicos

* JavaScript ES6+


## Uso

* Seleccionar un día: Haz click en los botones del pronóstico (ForecastDays) para actualizar    automáticamente el clima de la ciudad principal, las localidades populares y las ciudades del país.

* Cambiar tema: Usa el botón de Dark/Light Mode en el footer para alternar entre temas. Los íconos cambian de color según el modo.

* Navegación:
Home: Regresa a la vista principal.
Favoritos: Muestra las ciudades marcadas como favoritas.
Perfil: Accede a la configuración del usuario.

* Responsive: La app ajusta automáticamente la cantidad de días visibles:
Móvil: 5 días
Escritorio: 10 días

## Personalización
* Cambia la lista de localidades populares en WeatherData.jsx.

* Agrega o elimina ciudades en countryCities o popularCities.

* Ajusta los días visibles en ForecastDays.jsx modificando el slice() o el useEffect según el tamaño de pantalla.

* Puedes cambiar los íconos de Icons8 en los botones para adaptarlos a tu estilo.

## Funcionalidades futuras
* Integración con API de clima real.

* Guardado de ciudades favoritas en localStorage o backend.

* Mapa interactivo con ubicación de ciudades.

* Animaciones de cambio de clima y tema. (Analizando factibilidad)

* Notificaciones meteorológicas. (Analizando factibilidad)
