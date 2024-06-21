import { conexionJson } from "../conexionJson.js";
import { filtros } from "./filtroYpeticiones.js";

const listaClientes = document.querySelector("[data-listaClientes]");

function crearCardCliente(id, nombre, telefono, correo, imagen) {
    const cardCliente = document.createElement("li");
    cardCliente.className = "cardCliente";
    cardCliente.innerHTML = `
    <div class="contenedorImagenCliente">
        <img src=${imagen} class="imagenCliente">
    </div>
    <div class="contenedorInfoCliente">
        <h2 class="nombreCliente">${nombre}</h2>
        <span class="datosCliente">${correo}</span>
        <p class="datosCliente">${telefono}</p>
    </div>
    <div class="contenedorEditarCliente" name="${id}">
        <img src="../img/iconos/iconoEliminarBlanco.png" alt="icono editar" class="iconoEditarCliente">
    </div>
    `;
    return cardCliente;
}

async function mostrarClientes() {

    const datosListaJson = await conexionJson.datosJson("clientes");

    datosListaJson.forEach(cliente => {
        listaClientes.appendChild(crearCardCliente(cliente.id, cliente.nombre, cliente.telefono, cliente.correo, cliente.imagen))
    });

    filtros.filtrarClientes();

};

mostrarClientes();