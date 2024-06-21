import { conexionJson } from "../conexionJson.js";
import { category } from "../configuracion.js/categorias.js";

const formulario = document.querySelector('[data-envioFormulario]');
const botonForm = document.querySelectorAll('.botonesSecundarios');
var formularioBotones = document.querySelector('.formularioDashboard');
let categorys = category.listarSelectivosCategoria();

for (let contador = 0; contador < botonForm.length; contador++ ) {
    var nombreBoton = document.querySelectorAll('.spanBototnes');
    const boton = botonForm[contador];

    boton.onclick = function() {

        var tituloBoton = nombreBoton[contador].textContent;

        botonForm.forEach(foco => {
            foco.classList.remove('active');
        });

        boton.classList.add('active');

        while (formularioBotones.firstChild) {
            formularioBotones.removeChild(formularioBotones.firstChild);
        }

        cambiarForm(tituloBoton);
    };
}

function cambiarForm (nameFormulario) {

    switch(nameFormulario){
        case "Registrar producto":
            formularioBotones.innerHTML = `
            <h2 class="tituloFormulario">Registrar producto</h2>
    
            <fieldset class="contenedorInputsForm">
            
            <div class="contenedorInputTextForm">
                <input type="text" placeholder="Nombre" required class="inputsTypeTextForm" data-titulo maxlength="17">
                <input type="number" step="0.01" min="0" placeholder="Precio" required class="inputsTypeTextForm" data-precio>
                <input type="number" placeholder="Existencia" required class="inputsTypeTextForm" data-existencia>
                <select class="inputsTypeTextForm" data-categoria id="opcionesCategoriasEditProducto">
                    <option class="opcionesGenero">Categoria</option>
                </select>
                <select class="inputsTypeTextForm" data-genero>
                    <option class="opcionesGenero">Genero</option>
                    <option class="opcionesGenero">Hombre</option>
                    <option class="opcionesGenero">Mujer</option>
                    <option class="opcionesGenero">Ambos</option>
                </select>
            </div>

            <div class="inputsFinalesFotoFoto">
                <input type="url" class="inputImagenProducto" placeholder="URL de la imagen" data-imagen>
            </div>

            <input type="submit" class="inputsFinales">

            </fieldset>
            `
            formulario.addEventListener("submit", evento => subirProducto(evento));
            let categorys = category.listarSelectivosCategoria();
            break;
        case "Registrar Cliente":
            formularioBotones.innerHTML = `
            <h2 class="tituloFormulario">${nameFormulario}</h2>
    
            <fieldset class="contenedorInputsForm">
    
                <div class="contenedorInputTextForm">
                    <input type="text" placeholder="Nombre" required class="inputsTypeTextForm" data-nombre>
                    <input type="tel" placeholder="Telefono" required class="inputsTypeTextForm" data-telefono>
                    <input type="email" placeholder="Correo" class="inputsTypeTextForm" data-correo>
                    <input type="date" placeholder="Fecha de Nacimiento" required class="inputsTypeTextForm" data-fechaNacimiento>
                    <select class="inputsTypeTextForm" data-genero>
                        <option class="opcionesGenero">Genero</option>
                        <option class="opcionesGenero">Hombre</option>
                        <option class="opcionesGenero">Mujer</option>
                    </select>
                </div>

                <div class="inputsFinalesFotoFoto">
                <input type="url" class="inputImagenProducto" placeholder="URL de la imagen" data-imagen>
            </div>

                <input type="submit" class="inputsFinales">
    
            </fieldset>
            `
            formulario.addEventListener("submit", evento => subirCliente(evento));
            break;
        case "Registrar empleado":
            formularioBotones.innerHTML = `
            <h2 class="tituloFormulario">${nameFormulario}</h2>
    
            <fieldset class="contenedorInputsForm">
    
                <div class="contenedorInputTextForm">
                    <input type="text" placeholder="Nombre" required class="inputsTypeTextForm" id="nombreEmpleado">
                    <input type="tel" placeholder="Telefono" required class="inputsTypeTextForm" id="telefonoEmpleado">
                    <input type="email" placeholder="Correo" class="inputsTypeTextForm" id="emailEmpleados">
                    <input type="text" placeholder="Domicilio" required class="inputsTypeTextForm" id="domicilioEmpleado">
                    <input type="date" placeholder="Fecha de Nacimiento" required class="inputsTypeTextForm" id="fechaNcEmpleado">
                </div>

                <div class="inputsFinalesFotoFoto">
                    <input type="url" class="inputImagenProducto" placeholder="URL de la imagen" id="imgEmpleado">
                </div>

                <input type="submit" class="inputsFinales">
    
            </fieldset>
            `
            formulario.addEventListener("submit", evento => subirEmpleado(evento));
            break;
        case "Realizar cotizacion" :
            formularioBotones.innerHTML = `
            <h2 class="tituloFormulario">${nameFormulario}</h2>
    
            <fieldset class="contenedorInputsForm">
    
                <div class="contenedorInputTextForm">
                    <select class="inputsTypeTextForm">
                        <option class="opcionesGenero">Cliente</option>
                        <option class="opcionesGenero">Luis Hernandez</option>
                        <option class="opcionesGenero">Edgar Gallegos</option>
                        <option class="opcionesGenero">Damian Sanchez</option>
                    </select>
                    <input type="text" placeholder="Titulo" class="inputsTypeTextForm">
                    <button class="botonProductosPresupuesto">
                        <span>Productos</span    >
                    </button>
                </div>>

                <input type="button" value="Detalles" class="inputsFinal1">

                <input type="button" value="Guardar" class="inputsFinales">
    
            </fieldset>
            `
            break;
        default:
            break;
    }

}

async function subirProducto(evento) {
    evento.preventDefault();

    let productos = await conexionJson.datosJson("productos");
    let idExistentes = productos.map(p => p.id);

    function generarIDUnico(id) {
        let nuevoId;
        do {
            nuevoId = Math.floor(Math.random() * 1000000).toString();
        } while (id.includes(nuevoId));
        return nuevoId;
    }

    const id = generarIDUnico(idExistentes);
    const titulo = document.querySelector('[data-titulo]').value;
    const precio = parseInt(document.querySelector('[data-precio]').value);
    const existencia = parseFloat(document.querySelector('[data-existencia]').value);
    const categoria = document.querySelector('[data-categoria]').value;
    const genero = document.querySelector('[data-genero]').value;
    const imagen = document.querySelector('[data-imagen]').value;

    await conexionJson.postProductos(id,titulo,precio,categoria,genero,existencia,imagen);
}

formulario.addEventListener("submit", evento => subirProducto(evento));

async function subirCliente(evento) {
  evento.preventDefault();

  let clientes = await conexionJson.datosJson("clientes");
  let idExistentes = clientes.map(c => c.id);

  function generarIDUnico(id) {
    let nuevoId;
    do {
        nuevoId = Math.floor(Math.random() * 1000000).toString();
    } while (id.includes(nuevoId));
    return nuevoId;
  };

  const id = generarIDUnico(idExistentes);
  const nombre = document.querySelector('[data-nombre]').value;
  const telefono = parseFloat(document.querySelector('[data-telefono]').value);
  const correo = document.querySelector('[data-correo]').value;
  const fechaNacimiento = document.querySelector('[data-fechaNacimiento]').value;
  const genero = document.querySelector('[data-genero]').value;
  const imagen = document.querySelector('[data-imagen]').value;

  await conexionJson.postClientes(id,nombre,telefono,correo,fechaNacimiento,imagen);
};

async function subirEmpleado(evento) {
    evento.preventDefault();

    let empleados = await conexionJson.datosJson("empleados");
    let idExistentes = empleados.map(e => e.id);

    function generarIDUnico(id) {
        let nuevoId;
        do {
            nuevoId = Math.floor(Math.random() * 1000000).toString();
        } while (id.includes(nuevoId));
        return nuevoId;
    }

    const id = generarIDUnico(idExistentes);
    const nombre = document.querySelector('#nombreEmpleado').value;
    const telefono = document.querySelector('#telefonoEmpleado').value;
    const correo = document.querySelector('#emailEmpleados').value;
    const domicilio = document.querySelector('#domicilioEmpleado').value;
    const fechaNacimiento = document.querySelector('#fechaNcEmpleado').value;
    const imagen = document.querySelector('#imgEmpleado').value;

    await conexionJson.postEmpleados(id, nombre, telefono, correo, domicilio, fechaNacimiento, imagen);

}