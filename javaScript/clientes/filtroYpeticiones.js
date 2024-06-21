
function filtrarClientes() {
    const clientes = document.querySelectorAll('.cardCliente');
    const palabraBuscada = document.querySelector('.inputSearch').value.toLowerCase();

    clientes.forEach(product => {

        const nombreCliente = product.textContent.toLowerCase();

        let mostrarPorBusqueda = palabraBuscada === '' || nombreCliente.includes(palabraBuscada);

        if (mostrarPorBusqueda) {
            product.classList.remove('filtro');
        } else {
            product.classList.add('filtro');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    const campoBusqueda = document.querySelector('.inputSearch');

    campoBusqueda.addEventListener('input', filtrarClientes);

    filtrarClientes(); 
});

export const filtros = {
    filtrarClientes
}