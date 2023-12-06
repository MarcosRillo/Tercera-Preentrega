
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaPlatos = document.querySelector('#lista-platos');
let platosCarrito= [];

cargarEventListeners();
function cargarEventListeners() {
    listaPlatos.addEventListener('click', agregarPlato);

    carrito.addEventListener('click', eliminarPlato);

    document.addEventListener('DOMContentLoaded', () => {
        platosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    vaciarCarritoBtn.addEventListener('click', () => {
        platosCarrito = [];

        limpiarHTML();
    })
};

function agregarPlato(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const platoSeleccionado = e.target.parentElement.parentElement;

        leerDatosPlatos(platoSeleccionado);
    }
}

function eliminarPlato(e) {
    if(e.target.classList.contains('borrar-plato')) {
        const platoId = e.target.getAttribute('data-id');

        platosCarrito = platosCarrito.filter(plato => plato.id !== platoId);

        carritoHTML()
    }
}

function leerDatosPlatos(plato) {
    const infoPlato = {
        titulo: plato.querySelector('h4').textContent,
        precio: plato.querySelector('.precio').textContent,
        id: plato.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = platosCarrito.some(plato => plato.id === infoPlato.id)
    if (existe) {
        const platos = platosCarrito.map ( plato => {
            if (plato.id === infoPlato.id) {
                plato.cantidad++;
                return plato
            } else {
                return plato;
            }
        });
        platosCarrito = [...platos]
    } else {
        platosCarrito = [...platosCarrito, infoPlato];

    }
    carritoHTML();
}

function carritoHTML() {
    limpiarHTML()
    platosCarrito.forEach(plato => {
        const {titulo, precio, cantidad} = plato
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-plato" data-id="${plato.id}"> X </a>
            </td>

        `;

        contenedorCarrito.appendChild(row);
    })
            sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(platosCarrito));
}

function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}