
"use strict";

/* =========================
   1. MODO CLARO Y OSCURO
========================= */

const botonModo = document.getElementById("modo_btn");
const CLAVE_TEMA = "preferencia-tema";

function actualizarBotonTema() {
    if (!botonModo) return;

    const modoOscuro = document.body.classList.contains("modo_oscuro");

    botonModo.textContent = modoOscuro
        ? "☀️ Modo claro"
        : "🌙 Modo oscuro";

    botonModo.setAttribute("aria-pressed", String(modoOscuro));
}

try {
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);
    const preferencias = temaGuardado
        ? JSON.parse(temaGuardado)
        : {};

    if (preferencias.tema === "oscuro") {
        document.body.classList.add("modo_oscuro");
    }
} catch (error) {
    console.warn("No se pudo recuperar el tema guardado:", error);
}

actualizarBotonTema();

if (botonModo) {
    botonModo.addEventListener("click", () => {
        document.body.classList.toggle("modo_oscuro");

        const preferencias = {
            tema: document.body.classList.contains("modo_oscuro")
                ? "oscuro"
                : "claro"
        };

        try {
            localStorage.setItem(
                CLAVE_TEMA,
                JSON.stringify(preferencias)
            );
        } catch (error) {
            console.warn("No se pudo guardar el tema:", error);
        }

        actualizarBotonTema();
    });
}

/* =========================
   2. MENÚ RESPONSIVE
========================= */

const botonMenu = document.getElementById("menu-btn");
const menuPrincipal = document.getElementById("menu-principal");

function cerrarMenu() {
    if (!botonMenu || !menuPrincipal) return;

    menuPrincipal.classList.remove("menu-abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
}

if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener("click", () => {
        const estaAbierto = menuPrincipal.classList.toggle("menu-abierto");

        botonMenu.setAttribute("aria-expanded", String(estaAbierto));
        botonMenu.setAttribute(
            "aria-label",
            estaAbierto ? "Cerrar menú" : "Abrir menú"
        );
    });

    menuPrincipal.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrarMenu();
        }
    });
}

/* =========================
   3. FILTRO DE EXPERIENCIA
========================= */

const filtroExperiencia = document.getElementById("filtro-proyectos");
const resultadoFiltro = document.getElementById("resultado-filtro");
const seccionExperiencia = document.getElementById("experiencia");

if (filtroExperiencia && resultadoFiltro && seccionExperiencia) {
    const tarjetasExperiencia = Array.from(
        seccionExperiencia.querySelectorAll("article")
    );

    function filtrarExperiencia() {
        const busqueda = filtroExperiencia.value
            .trim()
            .toLocaleLowerCase("es");

        const tarjetasCoincidentes = tarjetasExperiencia.filter((tarjeta) => {
            const contenido = tarjeta.textContent.toLocaleLowerCase("es");
            return contenido.includes(busqueda);
        });

        tarjetasExperiencia.forEach((tarjeta) => {
            tarjeta.hidden = !tarjetasCoincidentes.includes(tarjeta);
        });

        const cantidad = tarjetasCoincidentes.length;

        if (cantidad === 0) {
            resultadoFiltro.textContent =
                "No se encontraron resultados. Prueba con otra palabra.";
        } else {
            resultadoFiltro.textContent =
                `${cantidad} ${cantidad === 1 ? "resultado encontrado" : "resultados encontrados"}.`;
        }
    }

    filtroExperiencia.addEventListener("input", filtrarExperiencia);
}

/* =========================
   4. VALIDACIÓN DEL FORMULARIO
========================= */

const formularioContacto = document.getElementById("formulario_contacto");
const mensajeFormulario = document.getElementById("mensaje_formulario");

if (formularioContacto && mensajeFormulario) {
    formularioContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formularioContacto.checkValidity()) {
            formularioContacto.reportValidity();

            mensajeFormulario.textContent =
                "Revisa los campos obligatorios antes de continuar.";
            mensajeFormulario.className = "mensaje-error";
            return;
        }

        mensajeFormulario.textContent =
            "¡Formulario validado correctamente! Esta demostración no envía mensajes a un servidor.";
        mensajeFormulario.className = "mensaje-exito";

        formularioContacto.reset();
    });

    formularioContacto.querySelectorAll("input, textarea, select").forEach((campo) => {
        campo.addEventListener("input", () => {
            mensajeFormulario.textContent = "";
            mensajeFormulario.className = "";
        });

        campo.addEventListener("change", () => {
            mensajeFormulario.textContent = "";
            mensajeFormulario.className = "";
        });
    });
}

/* =========================
   5. MODAL DE DISPONIBILIDAD
========================= */

const botonDisponibilidad = document.getElementById("btn-disponibilidad");
const modalInfo = document.getElementById("modal-info");

if (botonDisponibilidad && modalInfo) {
    botonDisponibilidad.addEventListener("click", () => {
        if (typeof modalInfo.showModal === "function") {
            modalInfo.showModal();
        }
    });

    // Permite cerrar el diálogo haciendo clic fuera de su contenido.
    modalInfo.addEventListener("click", (evento) => {
        if (evento.target === modalInfo) {
            modalInfo.close();
        }
    });
}

/* =========================
   6. REPOSITORIOS DE GITHUB
========================= */

const usuarioGitHub = "luciana-saavedra";

const estadoGitHub = document.getElementById("estado-github");
const listaRepositorios = document.getElementById("lista-repositorios");
const botonReintentarGitHub = document.getElementById("reintentar-github");

async function cargarRepositorios() {
    if (!estadoGitHub || !listaRepositorios) return;

    estadoGitHub.textContent = "Cargando repositorios...";
    listaRepositorios.replaceChildren();

    if (botonReintentarGitHub) {
        botonReintentarGitHub.disabled = true;
    }

    const url = `https://api.github.com/users/${usuarioGitHub}/repos?sort=updated&per_page=10`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error(
                    "No se encontró el usuario de GitHub. Revisa el nombre configurado."
                );
            }

            if (respuesta.status === 403) {
                throw new Error(
                    "GitHub limitó temporalmente las solicitudes. Intenta más tarde."
                );
            }

            throw new Error(
                `No se pudieron cargar los repositorios (error ${respuesta.status}).`
            );
        }

        const repositorios = await respuesta.json();

        if (!Array.isArray(repositorios)) {
            throw new Error("GitHub devolvió una respuesta inesperada.");
        }

        const repositoriosPropios = repositorios.filter(
            (repositorio) => !repositorio.fork
        );

        const repositoriosActualizados = repositoriosPropios.map(
            (repositorio) => ({
                nombre: repositorio.name,
                descripcion: repositorio.description || "Sin descripción disponible.",
                enlace: repositorio.html_url,
                lenguaje: repositorio.language || "No especificado"
            })
        );

        if (repositoriosActualizados.length === 0) {
            estadoGitHub.textContent =
                "No se encontraron repositorios propios para mostrar.";
            return;
        }

        const fragmento = document.createDocumentFragment();

        repositoriosActualizados.forEach((repositorio) => {
            const tarjeta = document.createElement("li");

            const enlace = document.createElement("a");
            enlace.href = repositorio.enlace;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";
            enlace.textContent = repositorio.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = repositorio.descripcion;

            const lenguaje = document.createElement("p");
            lenguaje.textContent = `Lenguaje: ${repositorio.lenguaje}`;

            tarjeta.append(enlace, descripcion, lenguaje);
            fragmento.appendChild(tarjeta);
        });

        listaRepositorios.appendChild(fragmento);

        estadoGitHub.textContent =
            `Se cargaron ${repositoriosActualizados.length} repositorios.`;
    } catch (error) {
        console.error("Error al cargar repositorios:", error);

        estadoGitHub.textContent =
            error instanceof TypeError
                ? "No se pudo conectar con GitHub. Revisa tu conexión e inténtalo de nuevo."
                : error.message;
    } finally {
        if (botonReintentarGitHub) {
            botonReintentarGitHub.disabled = false;
        }
    }
}

if (estadoGitHub && listaRepositorios) {
    cargarRepositorios();

    if (botonReintentarGitHub) {
        botonReintentarGitHub.addEventListener(
            "click",
            cargarRepositorios
        );
    }
}
