import { crear } from "./categorias.js";

const botonCrear = document.querySelector('.botonCrear');

botonCrear.addEventListener('click', ()=> {
    let nombreCategoria = document.querySelector('#newCat').value;
    if (nombreCategoria.length > 0) {
        crear.crearNuevaCategoria();
        location.reload();
    }
})
