# Hoja de Vida Web — Luciana Saavedra Ayarde

## Información del estudiante

- **Nombre completo:** Luciana Saavedra Ayarde
- **Carrera:** Ingeniería de Sistemas
- **Institución:** Universidad Católica Boliviana “San Pablo”
- **Proyecto:** Hoja de Vida Web Interactiva
- **Tecnologías:** HTML5, CSS3 y JavaScript nativo

## Descripción del proyecto

Este proyecto consiste en el desarrollo de una hoja de vida personal en formato web, diseñada para presentar mi perfil académico, habilidades técnicas, experiencia en actividades universitarias y proyectos tecnológicos.

El sitio utiliza HTML5 para estructurar el contenido semánticamente, CSS3 para el diseño visual y la adaptación a distintos dispositivos, y JavaScript nativo para incorporar funcionalidades interactivas.

El desarrollo se realiza sin frameworks ni librerías externas de CSS o JavaScript, aplicando buenas prácticas de organización, accesibilidad y diseño web.

## Objetivos

- Presentar mi perfil académico y profesional de manera clara y organizada.
- Aplicar etiquetas semánticas de HTML5.
- Implementar un diseño responsive con CSS3.
- Incorporar interactividad mediante JavaScript nativo.
- Aplicar principios básicos de accesibilidad web.
- Utilizar Git y GitHub para el control de versiones y la publicación del proyecto.

## Tecnologías utilizadas

### HTML5

Se utiliza para estructurar la información del sitio mediante etiquetas semánticas, formularios, tablas, enlaces y contenido multimedia.

### CSS3

Se utiliza para definir los colores, la tipografía, la distribución de los elementos, los estados visuales, el modo oscuro y la adaptación del sitio a diferentes tamaños de pantalla.

### JavaScript nativo

Se utiliza para implementar funcionalidades interactivas, como el menú de navegación, el cambio de tema, el filtrado de contenido, la validación del formulario y la consulta de repositorios mediante la API de GitHub.

### Git y GitHub

Se utilizan para registrar los cambios realizados durante el desarrollo, mantener el historial del proyecto y alojar el repositorio.

## Estructura del proyecto

```text
hoja-vida/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    │   ├── foto.jpg
    │   └── proyecto.jpg
    ├── video/
    │   └── proyecto.mp4
    ├── audio/
    │   └── presentacion.mp3
    ├── captions/
    │   └── proyecto.vtt
    └── documents/
        └── cv-luciana-saavedra.pdf
```

**Nota:** La estructura representa la organización prevista del proyecto. Los archivos multimedia y las carpetas deben coincidir con los recursos que realmente se encuentren en el repositorio. Si algún recurso tiene otro nombre o extensión, se debe actualizar la ruta correspondiente en el HTML.

## Estructura semántica HTML5

El documento emplea elementos semánticos para organizar el contenido y facilitar su comprensión:

- **Estructura general:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`.
- **Texto y semántica:** encabezados `<h1>` a `<h3>`, `<p>`, `<strong>`, `<em>`, `<mark>`, `<small>`, `<time>` y `<address>`.
- **Listas y tablas:** `<ul>`, `<ol>`, `<li>`, `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>` y `<td>`.
- **Contenido multimedia:** `<figure>`, `<figcaption>`, `<img>`, `<picture>`, `<audio>`, `<video>` y `<track>`.
- **Formularios:** `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<textarea>`, `<select>`, `<option>` y `<button>`.

## Funcionalidades interactivas

El proyecto contempla las siguientes funcionalidades:

1. **Modo claro y oscuro:** permite cambiar la apariencia del sitio.
2. **Menú responsive:** facilita la navegación en pantallas pequeñas.
3. **Filtro de contenido:** permite buscar y filtrar elementos mediante texto.
4. **Validación del formulario:** comprueba los campos y muestra mensajes al usuario.
5. **Consulta de repositorios de GitHub:** utiliza la API de GitHub para obtener información de repositorios públicos y contempla estados de carga y error.
6. **Diseño adaptable:** organiza el contenido según el tamaño de pantalla.
7. **Descarga del CV:** permite acceder al documento PDF mediante un enlace.

Estas funcionalidades deben estar implementadas y verificadas en `js/script.js` y `css/styles.css` para considerarse completas.

## Reto adicional de HTML5

El proyecto incluye los siguientes elementos adicionales cuando están presentes en el documento:

- **`<picture>`:** permite seleccionar imágenes según las condiciones definidas en sus fuentes.
- **`<progress>`:** representa el avance de una tarea o proceso.
- **`<meter>`:** representa una medida dentro de un rango conocido.
- **`<details>` y `<summary>`:** permiten mostrar u ocultar información complementaria.
- **`<dialog>`:** permite presentar un diálogo nativo.
- **Descarga del CV en PDF:** se realiza mediante un enlace que utiliza el atributo `download`.

## Accesibilidad web (A11y)

Se aplican los siguientes principios de accesibilidad:

- Definición del idioma principal del documento mediante `lang="es"`.
- Enlace para saltar directamente al contenido principal.
- Textos alternativos descriptivos en las imágenes informativas.
- Asociación entre etiquetas de formulario y sus respectivos campos.
- Uso de atributos como `aria-label`, `aria-labelledby` y `aria-describedby` cuando corresponda.
- Validación nativa de formularios mediante atributos como `required`, `pattern`, `minlength` y `maxlength`.
- Uso de elementos semánticos y una jerarquía coherente de encabezados.
- Identificación de mensajes de estado para comunicar resultados de las interacciones.

## Diseño responsive

La interfaz se adapta a diferentes tamaños de pantalla mediante CSS3 y media queries, procurando que el contenido sea legible y que la navegación sea funcional en dispositivos móviles, tabletas y computadoras.

## Control de versiones

El proyecto utiliza Git para registrar los cambios mediante commits descriptivos y GitHub como plataforma de alojamiento del repositorio.

Los cambios se organizan por tareas, como documentación, estilos, funcionalidades interactivas y correcciones, para mantener un historial claro del desarrollo.

## Ejecución del proyecto

1. Clonar el repositorio o descargar sus archivos.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Verificar que las rutas de CSS, JavaScript e imágenes coincidan con la estructura de carpetas.
4. Abrir `index.html` en un navegador. Para una experiencia de desarrollo más cómoda, se puede utilizar la extensión Live Server de Visual Studio Code.
5. Comprobar el funcionamiento de los controles, el formulario, los recursos multimedia y la consulta de GitHub.

## Publicación

El proyecto puede publicarse mediante GitHub Pages, configurando la rama y la carpeta donde se encuentra `index.html`.

**Repositorio:** [Agregar aquí el enlace al repositorio del proyecto](https://github.com/)

**Sitio publicado:** [Agregar aquí el enlace de GitHub Pages](https://pages.github.com/)

## Autora

**Luciana Saavedra Ayarde**

Estudiante de Ingeniería de Sistemas  
Universidad Católica Boliviana “San Pablo”

Proyecto académico desarrollado para aplicar los fundamentos de HTML5, CSS3, JavaScript nativo, accesibilidad web y control de versiones.
