import { conexionJson } from "../conexionJson.js";

//Peticiones PUT

function datosProductosaEditar(imagen, nombre, precio, existencia) {
    document.getElementById('imagenProductoEdit').src = `${imagen}`;
    document.getElementById('newName').innerHTML = nombre;
    document.querySelector('#newPRECIO').innerHTML = precio;
    document.querySelector('#existenciaActual').innerHTML = existencia;
};

async function editarProducto () {
    let iconoEditar = document.querySelectorAll(`#iconoEditar`);
    let ventanaEditor = document.querySelector('.contenedor-fondoDesenfocado-editarProducto');
    const botonAplicar = document.querySelector('.inputAplicarNuevaImg');
    const botonGuardar = document.querySelector('.botonGuardar');
    const datosListaJson = await conexionJson.datosJson("productos");
    const categoriaJson = await conexionJson.datosJson("categorias")
    let categoriaSelect = document.querySelector('#opcionesCategoriasEditProducto');
    let generoSelect = document.querySelector('#generoEditProducto');

    iconoEditar.forEach(function(producto){
        let id = producto.name;

        producto.addEventListener('click', ()=>{
            datosListaJson.forEach(producto => {
                if (id == producto.id) {
                    datosProductosaEditar(producto.imagen, producto.titulo, producto.precio, producto.existencia);
                    categoriaSelect.value = producto.categoria;
                    generoSelect.value = producto.genero;
                }

                botonAplicar.addEventListener('click', async (event) => {
                    event.preventDefault();
                    let nombreProducto = document.querySelector('#newNameInput').value;
                    let precio = document.querySelector('#newPrecio').value;
                    let categoriaSeleccionada = categoriaSelect.value;
                    let generoSeleccionado = generoSelect.value;
                    let nuevaExistencia = document.querySelector('#newCantidad').value;
                    let nuevaImagen = document.querySelector('#urlImagen').value;

                    if (nombreProducto.length <= 0) {
                        nombreProducto = document.querySelector('#newName').textContent;
                    }
                    if(precio.length <= 0){
                        precio = document.querySelector('#newPRECIO').textContent;
                    }
                    if (nuevaExistencia.length <= 0) {
                        nuevaExistencia = document.querySelector('#existenciaActual').textContent;
                    }
                    if (nuevaImagen.length <= 0) {
                        nuevaImagen = document.querySelector('[data-imagenPUT]').src;
                    }

                    let datosNuevos = conexionJson.putProductos(id, nombreProducto, precio, categoriaSeleccionada, generoSeleccionado, nuevaExistencia, nuevaImagen);
                    datosNuevos;

                    location.reload();

                });

                botonGuardar.addEventListener('click', async (event) => {
                    event.preventDefault();
                    let nombreProducto = document.querySelector('#newNameInput').value;
                    let precio = document.querySelector('#newPrecio').value;
                    let categoriaSeleccionada = categoriaSelect.value;
                    let generoSeleccionado = generoSelect.value;
                    let nuevaExistencia = document.querySelector('#newCantidad').value;
                    let nuevaImagen = document.querySelector('#urlImagen').value;

                    if (nombreProducto.length <= 0) {
                        nombreProducto = document.querySelector('#newName').textContent;
                    }
                    if(precio.length <= 0){
                        precio = document.querySelector('#newPRECIO').textContent;
                    }
                    if (nuevaExistencia.length <= 0) {
                        nuevaExistencia = document.querySelector('#existenciaActual').textContent;
                    }
                    if (nuevaImagen.length <= 0) {
                        nuevaImagen = document.querySelector('[data-imagenPUT]').src;
                    }

                    let datosNuevos = conexionJson.putProductos(id, nombreProducto, precio, categoriaSeleccionada, generoSeleccionado, nuevaExistencia, nuevaImagen);
                    datosNuevos;

                    location.reload();
                })

            });
            
            ventanaEditor.classList.add('select');
        });
    });

};

//Peticiones Delete

async function eliminarProducto () {
    const iconoEliminar = document.querySelectorAll('#iconoEliminarProducto');
    const ventanaConfirmacion = document.querySelector('#ventanaEliminarProducto');
    const botonAceptar = document.querySelector('#btnEliminarProducto');
    const botonCancelar = document.querySelector('#btnCanelarDelete');

    iconoEliminar.forEach((producto)=> {

        const aceptarDelete = () => {
            let id = producto.name;
            conexionJson.eliminarProducto(id);
            location.reload();
        };

        producto.addEventListener('click', () => {
            ventanaConfirmacion.classList.remove('display');
            botonAceptar.addEventListener('click', aceptarDelete);
        });

        botonCancelar.addEventListener('click', () => {
            ventanaConfirmacion.classList.add('display');
            botonAceptar.removeEventListener('click', aceptarDelete);
        });

    });
};


export const peticiones = {
    editarProducto,
    eliminarProducto
}
