# codeMate AR - Sitio Web de Portafolio

Este repositorio contiene el sitio web oficial del portafolio de codeMate AR. Es un sitio web estático, totalmente responsivo, multilingüe y con temas (claro/oscuro) que muestra servicios, proyectos y tecnologías.

## Características

*   **Portafolio Público:** Un sitio web moderno y responsivo para mostrar servicios, proyectos y habilidades.
*   **Multilingüe:** Soporta inglés y español.
*   **Temas:** Incluye un modo claro y oscuro.
*   **Contenido Dinámico:** Obtiene y muestra la fecha y temperatura actual utilizando la API de Open-Meteo.
*   **Elementos Interactivos:** Incluye un formulario de contacto con un efecto de animación de escritura.

## Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **APIs:**
    *   **Open-Meteo:** Para obtener datos meteorológicos.
    *   **API de Geolocalización:** Para obtener la ubicación del usuario.

## Cómo Ejecutarlo

Este es un sitio web estático. Para ejecutarlo, solo necesitas abrir el archivo `index.html` en tu navegador web.

1.  Clona este repositorio a tu máquina local.
2.  Abre el archivo `index.html` en un navegador web moderno (como Chrome, Firefox o Edge).

**Nota:** Para permitir que el sitio web obtenga tu ubicación y el clima, es posible que necesites servir los archivos a través de un servidor web local. Una forma sencilla de hacerlo es usando una extensión de VS Code como "Live Server" o ejecutando un servidor simple de Python en el directorio raíz del proyecto:

```bash
python -m http.server
```

Luego, abre tu navegador y navega a `http://localhost:8000`.