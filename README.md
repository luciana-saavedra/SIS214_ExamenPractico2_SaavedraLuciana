# Hoja de Vida Web - Luciana Saavedra Ayarde

## Información del estudiante

* **Nombre completo:** Luciana Saavedra Ayarde
* **Carrera:** Ingeniería de Sistemas
* **Institución:** Universidad Católica Boliviana "San Pablo"

## Descripción del proyecto

Este proyecto consiste en el desarrollo de una **hoja de vida personal en formato web**, estructurada exclusivamente con **HTML5 nativo**. La actividad pone a prueba el uso de semántica Web, estructuración de datos, tablas, formularios validados, contenido multimedia y estándares de accesibilidad (A11y).

No se utilizaron frameworks ni librerías de CSS o JavaScript, demostrando las capacidades puras del estándar HTML5.

## Etiquetas HTML5 utilizadas

Para organizar semánticamente la información se estructuraron las siguientes etiquetas nativas:

* **Estructura general:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
* **Texto y semántica:** `<h1>` a `<h3>`, `<p>`, `<strong>`, `<em>`, `<mark>`, `<small>`, `<time>`, `<address>`.
* **Listas e Idiomas:** `<ul>`, `<ol>`, `<li>`, `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
* **Multimedia:** `<figure>`, `<figcaption>`, `<img>`, `<picture>`, `<audio>`, `<video>`, `<track>`.
* **Formulario y validación:** `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<textarea>`, `<select>`, `<option>`, `<button>`.

## Reto Adicional (Implementaciones avanzadas HTML5)

Se incorporaron todos los elementos del reto adicional planteados en la guía:

1. **`<picture>`**: Para gestión responsive nativa de la fotografía del encabezado.
2. **`<progress>`**: Para visualizar cuantitativamente el avance académico en la carrera.
3. **`<meter>`**: Para mostrar los niveles de dominio en habilidades técnicas de programación.
4. **`<details>` y `<summary>`**: Para colapsar información complementaria e intereses personales.
5. **`<dialog>`**: Para mostrar un aviso modal nativo de disponibilidad sin librerías externas.
6. **Descarga de CV en PDF**: Mediante el atributo `download` en el hipervínculo principal del encabezado.

## Accesibilidad (A11y)

* Atributo de idioma principal `lang="es"`.
* Enlace de salto al contenido principal (`#contenido-principal`).
* Atributos `alt` descriptivos en todas las imágenes.
* Atributos `aria-labelledby` y `aria-describedby` para conectar secciones e instrucciones.
* Asociación correcta entre `<label for="...">` e `<input id="...">`.
* Campos del formulario validados con atributos nativos (`required`, `pattern`, `minlength`, `maxlength`).

## Estructura del repositorio

```text
hoja-vida/
├── index.html
├── assets/
│   ├── images/
│   │   ├── foto.jpg
│   │   └── proyecto.jpg
│   ├── video/
│   │   ├── proyecto.mp4
│   └── documents/
│       └── cv-luciana-saavedra.pdf
└── README.md