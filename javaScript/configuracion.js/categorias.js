import { conexionJson } from "../conexionJson.js";

const listaCategoria = document.querySelector("[data-listaCategoria]");

function crearCategoria(nombreCategoria) {
    const opcionCategoria = document.createElement("option");
    opcionCategoria.className = "opcionesFiltro";
    opcionCategoria.setAttribute('data-category', nombreCategoria);
    opcionCategoria.innerHTML = `${nombreCategoria}`;
    return opcionCategoria;
};

async function listarSelectivosCategoria() {
    const listaJson = await conexionJson.datosJson("categorias");
    const selectCategoria = document.querySelector('#opcionesCategorias');
    const selectivoEdiProducto = document.querySelector('#opcionesCategoriasEditProducto');
    if (selectCategoria) {
        listaJson.forEach(categoria => {
            const opcion = crearCategoria(categoria.nombreCategoria);
            selectCategoria.appendChild(opcion);
        });
    }
    if (selectivoEdiProducto) {
        listaJson.forEach(categoria => {
            const opcion = crearCategoria(categoria.nombreCategoria);
            selectivoEdiProducto.appendChild(opcion)
        });
    }
}

function crearCardCategoria(id, nombreCategoria) {
    const cardCategoria = document.createElement("button");
    cardCategoria.className = "botonCategoria";
    cardCategoria.innerHTML = `
    <span class="nombreCategoria">${nombreCategoria}</span>
    <img src="../img/iconos/iconoBoteEliminar.png" alt="" class="iconoEliminarCategoria" name="${id}">
    `;
    return cardCategoria;
}

async function listarCategoria() {
    const listaJson = await conexionJson.datosJson("categorias");
    listaJson.forEach(categoria => listaCategoria.appendChild(crearCardCategoria(categoria.id, categoria.nombreCategoria)));
    eliminarCategoria();
}

async function eliminarCategoria() {

    const iconoEliminar = document.querySelectorAll(".iconoEliminarCategoria");
    iconoEliminar.forEach((categoria)=>{
        let id = categoria.name;
        categoria.addEventListener('click', () => {
            conexionJson.eliminarCategria(id);
        })
    })
}

async function crearNuevaCategoria() {
    
    let categorias = await conexionJson.datosJson("categorias");
    let idExistentes = categorias.map(c => c.id);

    function generarIDUnico(id) {
        let nuevoId;
        do {
            nuevoId = Math.floor(Math.random() * 1000000).toString();
        } while (id.includes(nuevoId));
        return nuevoId;
    }

    const id = generarIDUnico(idExistentes);
    const nombre = document.querySelector('.inputNombreCategoria').value;

    await conexionJson.postCategorias(id, nombre)
}

listarCategoria();

export const category = {listarSelectivosCategoria}
export const crear = {crearNuevaCategoria}