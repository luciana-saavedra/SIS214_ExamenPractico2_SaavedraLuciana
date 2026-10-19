
"use strict";

// ========================================
// 1. MODO CLARO / OSCURO PERSISTENTE
// ========================================

const botonModo = document.getElementById("modo_btn");
const CLAVE_TEMA = "preferencia-tema";

function actualizarBotonTema() {
    if (!botonModo) return;

    const oscuro = document.body.classList.contains("modo_oscuro");

    botonModo.textContent = oscuro
        ? "☀️ Modo claro"
        : "🌙 Modo oscuro";

    botonModo.setAttribute("aria-pressed", String(oscuro));
}

try {
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);

    if (temaGuardado === "oscuro") {
        document.body.classList.add("modo_oscuro");
    }
} catch (error) {
    console.warn("No se pudo recuperar el tema:", error);
}

actualizarBotonTema();

if (botonModo) {
    botonModo.addEventListener("click", () => {
        document.body.classList.toggle("modo_oscuro");

        const tema = document.body.classList.contains("modo_oscuro")
            ? "oscuro"
            : "claro";

        try {
            localStorage.setItem(CLAVE_TEMA, tema);
        } catch (error) {
            console.warn("No se pudo guardar el tema:", error);
        }

        actualizarBotonTema();
    });
}


// ========================================
// 2. MENÚ HAMBURGUESA
// ========================================

const botonMenu = document.getElementById("menu-btn");
const menu = document.getElementById("menu-principal");

if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
        const abierto =
            botonMenu.getAttribute("aria-expanded") === "true";

        const nuevoEstado = !abierto;

        botonMenu.setAttribute(
            "aria-expanded",
            String(nuevoEstado)
        );

        botonMenu.setAttribute(
            "aria-label",
            nuevoEstado
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );

        menu.classList.toggle("menu-abierto", nuevoEstado);
    });

    menu.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            menu.classList.remove("menu-abierto");

            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute(
                "aria-label",
                "Abrir menú de navegación"
            );
        });
    });
}


// ========================================
// 3. FILTRO DE PROYECTOS
// ========================================

const filtro = document.getElementById("filtro-proyectos");
const seccionProyectos = document.getElementById("proyectos");
const mensajeFiltro = document.getElementById("resultado-filtro");

if (filtro && seccionProyectos) {
    const proyectos = Array.from(
        seccionProyectos.querySelectorAll("article")
    );

    function filtrarProyectos() {
        const consulta = filtro.value
            .trim()
            .toLocaleLowerCase("es");

        let cantidadVisibles = 0;

        proyectos.forEach((proyecto) => {
            const contenido = proyecto.textContent
                .toLocaleLowerCase("es");

            const tecnologias = (
                proyecto.dataset.tecnologias || ""
            ).toLocaleLowerCase("es");

            const coincide =
                consulta === "" ||
                contenido.includes(consulta) ||
                tecnologias.includes(consulta);

            // Ocultar los proyectos que no coincidan.
            proyecto.hidden = !coincide;

            if (coincide) {
                cantidadVisibles++;
            }
        });

        if (mensajeFiltro) {
            if (consulta === "") {
                mensajeFiltro.textContent =
                    `Mostrando todos los proyectos (${cantidadVisibles}).`;
            } else if (cantidadVisibles === 0) {
                mensajeFiltro.textContent =
                    "No se encontraron proyectos coincidentes.";
            } else {
                mensajeFiltro.textContent =
                    `Se encontraron ${cantidadVisibles} proyecto(s).`;
            }
        }
    }

    filtro.addEventListener("input", filtrarProyectos);

    // Aplicar el filtro inicial.
    filtrarProyectos();
}


// ========================================
// 4. FORMULARIO DE CONTACTO
// ========================================

const formulario = document.getElementById("formulario_contacto");
const mensajeFormulario = document.getElementById("mensaje_formulario");

if (formulario && mensajeFormulario) {
    formulario
        .querySelectorAll("input, textarea, select")
        .forEach((campo) => {
            campo.addEventListener("input", () => {
                campo.setCustomValidity("");

                if (campo.checkValidity()) {
                    campo.removeAttribute("aria-invalid");
                } else {
                    campo.setAttribute("aria-invalid", "true");
                }

                mensajeFormulario.textContent = "";
                mensajeFormulario.className = "";
            });

            campo.addEventListener("change", () => {
                campo.setCustomValidity("");

                if (campo.checkValidity()) {
                    campo.removeAttribute("aria-invalid");
                } else {
                    campo.setAttribute("aria-invalid", "true");
                }
            });
        });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            mensajeFormulario.textContent =
                "Revisa los campos: hay datos incompletos o inválidos.";

            mensajeFormulario.className = "mensaje-error";
            formulario.reportValidity();
            return;
        }

        // Demostración académica: no envía datos a un servidor.
        mensajeFormulario.textContent =
            "¡Validación exitosa! Este formulario de demostración no envía mensajes.";

        mensajeFormulario.className = "mensaje-exito";

        formulario.reset();

        formulario
            .querySelectorAll("[aria-invalid]")
            .forEach((campo) => {
                campo.removeAttribute("aria-invalid");
            });
    });
}


// ========================================
// 5. DIÁLOGO DE DISPONIBILIDAD
// ========================================

const botonDisponibilidad =
    document.getElementById("btn-disponibilidad");

const modalInfo = document.getElementById("modal-info");

if (botonDisponibilidad && modalInfo) {
    botonDisponibilidad.addEventListener("click", () => {
        if (typeof modalInfo.showModal === "function") {
            modalInfo.showModal();
        }
    });
}


// ========================================
// 6. REPOSITORIOS PÚBLICOS DE GITHUB
// ========================================

const usuarioGitHub = "luciana-saavedra";

const estadoGitHub = document.getElementById("estado-github");
const listaRepositorios = document.getElementById("lista-repositorios");
const botonReintentar = document.getElementById("reintentar-github");

async function cargarRepositorios() {
    if (!estadoGitHub || !listaRepositorios) return;

    estadoGitHub.textContent = "Cargando repositorios...";
    estadoGitHub.dataset.estado = "loading";

    listaRepositorios.replaceChildren();

    if (botonReintentar) {
        botonReintentar.disabled = true;
    }

    try {
        // URL correcta de la API de GitHub.
        const url =
            `https://api.github.com/users/${usuarioGitHub}/repos?sort=updated&per_page=10`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error(
                    "No se encontró el usuario de GitHub. Revisa el nombre configurado."
                );
            }

            if (respuesta.status === 403) {
                throw new Error(
                    "GitHub limitó temporalmente las consultas."
                );
            }

            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const repositorios = await respuesta.json();

        // Mostrar repositorios propios, excluyendo los forks.
        const repositoriosPropios = repositorios.filter(
            (repo) => !repo.fork
        );

        if (repositoriosPropios.length === 0) {
            estadoGitHub.textContent =
                "No se encontraron repositorios propios en esta consulta.";

            estadoGitHub.dataset.estado = "success";
            return;
        }

        repositoriosPropios.forEach((repo) => {
            const elemento = document.createElement("li");
            const enlace = document.createElement("a");

            enlace.href = repo.html_url;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";
            enlace.textContent = repo.name;

            elemento.appendChild(enlace);

            if (repo.description) {
                elemento.appendChild(
                    document.createTextNode(` — ${repo.description}`)
                );
            }

            listaRepositorios.appendChild(elemento);
        });

        estadoGitHub.textContent =
            "Repositorios cargados correctamente.";

        estadoGitHub.dataset.estado = "success";

    } catch (error) {
        console.error("Error al cargar GitHub:", error);

        estadoGitHub.textContent =
            `No se pudieron cargar los repositorios: ${error.message}`;

        estadoGitHub.dataset.estado = "error";

    } finally {
        if (botonReintentar) {
            botonReintentar.disabled = false;
        }
    }
}

if (botonReintentar) {
    botonReintentar.addEventListener("click", cargarRepositorios);
}

cargarRepositorios();