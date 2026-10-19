
"use strict";

// 1. Modo claro/oscuro persistente
const botonModo = document.getElementById("modo_btn");
const CLAVE_TEMA = "preferencia-tema";

try {
    const temaGuardado = JSON.parse(localStorage.getItem(CLAVE_TEMA));

    if (temaGuardado === "oscuro") {
        document.body.classList.add("modo_oscuro");
    }
} catch (error) {
    console.warn("No se pudo recuperar el tema:", error);
}

function actualizarBotonTema() {
    const oscuro = document.body.classList.contains("modo_oscuro");
    botonModo.textContent = oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
    botonModo.setAttribute("aria-pressed", String(oscuro));
}

actualizarBotonTema();

botonModo.addEventListener("click", () => {
    document.body.classList.toggle("modo_oscuro");

    const tema = document.body.classList.contains("modo_oscuro")
        ? "oscuro"
        : "claro";

    try {
        localStorage.setItem(CLAVE_TEMA, JSON.stringify(tema));
    } catch (error) {
        console.warn("No se pudo guardar el tema:", error);
    }

    actualizarBotonTema();
});

// 2. Menú hamburguesa para móviles y tablets
const botonMenu = document.getElementById("menu-btn");
const menu = document.getElementById("menu-principal");

botonMenu.addEventListener("click", () => {
    const abierto = botonMenu.getAttribute("aria-expanded") === "true";

    botonMenu.setAttribute("aria-expanded", String(!abierto));
    botonMenu.setAttribute(
        "aria-label",
        abierto ? "Abrir menú de navegación" : "Cerrar menú de navegación"
    );
    menu.classList.toggle("menu-abierto", !abierto);
});

menu.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("menu-abierto");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
    });
});

// 3. Filtro de proyectos: conserva la colección original
const filtro = document.getElementById("filtro-proyectos");
const proyectosOriginales = Array.from(
    document.querySelectorAll("#proyectos article")
);

const mensajeFiltro = document.getElementById("resultado-filtro");

filtro.addEventListener("input", () => {
    const consulta = filtro.value.trim().toLowerCase();

    const resultados = proyectosOriginales.filter(proyecto => {
        return proyecto.textContent.toLowerCase().includes(consulta) ||
            (proyecto.dataset.tecnologias || "").toLowerCase().includes(consulta);
    });

    proyectosOriginales.forEach(proyecto => {
        proyecto.hidden = !resultados.includes(proyecto);
    });

    resultados.map(proyecto => proyecto);
    mensajeFiltro.textContent =
        `${resultados.length} proyecto(s) encontrado(s).`;
});

// 4. Formulario: validación al escribir y al enviar
const formulario = document.getElementById("formulario_contacto");
const mensajeFormulario = document.getElementById("mensaje_formulario");

formulario.querySelectorAll("input, textarea, select").forEach(campo => {
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
        campo.setAttribute(
            "aria-invalid",
            String(!campo.checkValidity())
        );
    });
});

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
        mensajeFormulario.textContent =
            "Revisa los campos marcados: hay datos incompletos o inválidos.";
        mensajeFormulario.className = "mensaje-error";
        formulario.reportValidity();
        return;
    }

    // Demostración académica: no envía datos a un servidor.
    mensajeFormulario.textContent =
        "¡Validación exitosa! Este formulario de demostración no envía mensajes.";
    mensajeFormulario.className = "mensaje-exito";
    formulario.reset();

    formulario.querySelectorAll("[aria-invalid]").forEach(campo => {
        campo.removeAttribute("aria-invalid");
    });
});

// Diálogo de disponibilidad
const botonDisponibilidad = document.getElementById("btn-disponibilidad");
const modalInfo = document.getElementById("modal-info");

botonDisponibilidad.addEventListener("click", () => {
    modalInfo.showModal();
});

// 5. Fetch API: repositorios públicos de GitHub
const usuarioGitHub = "luciana-saavedra";
const estadoGitHub = document.getElementById("estado-github");
const listaRepositorios = document.getElementById("lista-repositorios");
const botonReintentar = document.getElementById("reintentar-github");

async function cargarRepositorios() {
    estadoGitHub.textContent = "Cargando repositorios...";
    estadoGitHub.dataset.estado = "loading";
    listaRepositorios.replaceChildren();

    try {
        const respuesta = await fetch(
            `https://api.github.com/users/${usuarioGitHub}/repos?sort=updated&per_page=10`
        );

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error("No se encontró el usuario de GitHub (404).");
            }

            if (respuesta.status === 403) {
                throw new Error("GitHub limitó temporalmente las consultas (403).");
            }

            if (respuesta.status >= 500) {
                throw new Error("GitHub presenta un problema en sus servidores.");
            }

            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const repositorios = await respuesta.json();

        repositorios
            .filter(repo => !repo.fork)
            .map(repo => {
                const elemento = document.createElement("li");
                const enlace = document.createElement("a");

                enlace.href = repo.html_url;
                enlace.target = "_blank";
                enlace.rel = "noopener noreferrer";
                enlace.textContent = repo.name;

                elemento.append(enlace);

                if (repo.description) {
                    elemento.append(
                        document.createTextNode(` — ${repo.description}`)
                    );
                }

                return elemento;
            })
            .forEach(elemento => listaRepositorios.append(elemento));

        estadoGitHub.textContent = repositorios.length
            ? "Repositorios cargados correctamente."
            : "Consulta completada; no se encontraron repositorios.";

        estadoGitHub.dataset.estado = "success";
    } catch (error) {
        estadoGitHub.textContent = `No se pudieron cargar los repositorios: ${error.message}`;
        estadoGitHub.dataset.estado = "error";
    }
}

botonReintentar.addEventListener("click", cargarRepositorios);
cargarRepositorios();