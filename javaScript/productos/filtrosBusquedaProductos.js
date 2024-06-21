
function filtrarProductos() {
    const productos = document.querySelectorAll('#productosTotal');
    const categoriaSeleccionada = document.querySelector('#opcionesCategorias').value.toLowerCase();
    const existenciaSeleccionada = document.querySelector('#opcionesExistencia').value;
    const palabraBuscada = document.querySelector('#campoBusqueda').value.toLowerCase();

    productos.forEach(product => {
        const categoriaProducto = product.getAttribute('data-category').toLowerCase();
        const existenciaProducto = parseInt(product.getAttribute('data-existencia'));
        const nombreProducto = product.textContent.toLowerCase();

        let mostrarPorCategoria = categoriaSeleccionada === 'todos' || categoriaProducto === categoriaSeleccionada;
        let mostrarPorExistencia = existenciaSeleccionada === 'Todos' || 
                                    (existenciaSeleccionada === 'Con existencia' && existenciaProducto > 0) ||
                                    (existenciaSeleccionada === 'Sin existencia' && existenciaProducto === 0);
        let mostrarPorBusqueda = palabraBuscada === '' || nombreProducto.includes(palabraBuscada);

        if (mostrarPorCategoria && mostrarPorExistencia && mostrarPorBusqueda) {
            product.classList.remove('filtro');
        } else {
            product.classList.add('filtro');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelect = document.querySelector('#opcionesCategorias');
    const existenciaSelect = document.querySelector('#opcionesExistencia');
    const campoBusqueda = document.querySelector('#campoBusqueda');

    categoriaSelect.addEventListener('input', filtrarProductos);
    existenciaSelect.addEventListener('input', filtrarProductos);
    campoBusqueda.addEventListener('input', filtrarProductos);

    filtrarProductos(); 
});

export const filtros = {
    filtrarProductos
}