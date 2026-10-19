// Cambio de modo oscuro y claro

const botonModo = document.getElementById("modo_btn");

botonModo.addEventListener("click", function () {

    document.body.classList.toggle("modo_oscuro");

    if (document.body.classList.contains("modo_oscuro")) {
        botonModo.textContent = "☀️ Modo claro";
    } else {
        botonModo.textContent = "🌙 Modo oscuro";
    }

});


// Diálogo de disponibilidad

const botonDisponibilidad = document.getElementById("btn-disponibilidad");
const modalInfo = document.getElementById("modal-info");

botonDisponibilidad.addEventListener("click", function () {
    modalInfo.showModal();
});


// Validación del formulario

const formulario = document.getElementById("formulario_contacto");
const mensajeFormulario = document.getElementById("mensaje_formulario");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    if (!formulario.checkValidity()) {

        mensajeFormulario.textContent =
            "Por favor, completa correctamente todos los campos obligatorios.";

        mensajeFormulario.className = "mensaje-error";

        formulario.reportValidity();

        return;
    }

    mensajeFormulario.textContent =
        "¡Mensaje enviado correctamente! Gracias por contactarme.";

    mensajeFormulario.className = "mensaje-exito";

    formulario.reset();

});