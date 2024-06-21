import { conexionJson } from "../conexionJson.js";
import { peticiones } from "./peticones.js";
import { filtros } from "./filtrosBusquedaProductos.js";
import { category } from "../configuracion.js/categorias.js";

const listaProductos = document.querySelector("[data-listaProductos]");

function crearCardProducto(id, titulo, precio, categoria, existencia, imagen) {
    const cardProducto = document.createElement("div");
    let categoriaMin = categoria.toLowerCase();
    cardProducto.className = "cardProducto filtro";
    cardProducto.setAttribute('data-category', categoriaMin);
    cardProducto.setAttribute('data-Existencia', existencia);
    cardProducto.setAttribute('title', titulo)
    cardProducto.id = 'productosTotal'
    cardProducto.innerHTML = `
    <div class="contenedorImagenProducto">
        <img src="${imagen}" alt="" class="imagenProducto">
    </div>
    <div class="contenedorInfoProducto">
        <div>
            <legend class="nombreProducto">${titulo}</legend>
            <p class="precioProducto">$</p>
            <p class="precioProducto" id="precioEntero">${precio}</p>
            <p class="precioProducto">Existencia: ${existencia}</p>
        </div>
        <div class="contenedorIconoEditar">
            <button class="botonEditarProducto" id="iconoEditar" name="${id}">
                <img src="../img/iconos/editar.png" alt="" class="iconoEditar">
            </button>
            <button class="botonEditarProducto" id="iconoEliminarProducto" name="${id}">
                <img src="../img/iconos/iconoEliminarBlanco.png" class="iconoEditar">
            </button>
        </div>
    </div>
    `;
    return cardProducto;
};

async function mostrarProductos(){

    const productos = await conexionJson.datosJson("productos");

    productos.forEach(productos => {
        listaProductos.appendChild(crearCardProducto(productos.id, productos.titulo, productos.precio, productos.categoria, productos.existencia, productos.imagen));
    });

    peticiones.editarProducto();
    peticiones.eliminarProducto();
    filtros.filtrarProductos();

    let categorys = category.listarSelectivosCategoria();

};

mostrarProductos()