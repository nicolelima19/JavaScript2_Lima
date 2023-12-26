const URL = "/js/libros.json"
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || []
const libros = []

const contenedor = document.querySelector("div.container#divcontenedor")
const btnCarrito = document.querySelector("img#carrito")
const inputBuscar = document.querySelector("input#inputBusqueda")

function crearCardError() {
    return `<div class="alert alert-danger" role="alert">
                <div class="divCardError">
                    <div class="imagenError">🤷</div>
                    <div class="leyendaError">No pudimos cargar los productos.</div>
                    <div class="leyandaIntento">Intenta nuevamente en unos segundos.</div>
                </div>
            </div>`
}

function crearCardHTML(libros) {
    return `<div class="card" style="width: 15rem;">
                <div class="card-body">
                    <div class="card-imagen"><img src="${libros.imagen}" alt=""></div>
                    <div class="card-title">${libros.titulo}</div>
                    <div class="card-text">${libros.autor}</div>
                    <div class="card-importe">${libros.precio}</div>
                    <button id="${libros.id}" type="button" class="btn btn-outline-warning">Agregar</button>
                </div>
            </div>`
}

function cargarLibros(array) {
    return new Promise((resolve, reject) => {
        contenedor.innerHTML = "";
        if (array && array.length > 0) {
            array.forEach((libro) => contenedor.innerHTML += crearCardHTML(libro));
            activarClickEnBotones();
            resolve();
        } else {
            contenedor.innerHTML = crearCardError();
            reject("No hay libros para cargar");
        }
    });
}

inputBuscar.addEventListener("search", () => {
    let param = inputBuscar.value.trim().toLowerCase();
    let resultado = libros.filter((libro) => libro.titulo.toLowerCase().includes(param));
    cargarLibros(resultado);
});

function mostrarLibros() {
    return fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            libros.push(...data);
            return libros;
        })
        .then((libros) => cargarLibros(libros))
        .catch((error) => {
            manejarError("Error al cargar libros: " + error);
        });
}

mostrarLibros()

function activarClickEnBotones() {
    const botonesAgregar = document.querySelectorAll("button.btn")
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.id)
            const libroSeleccionado = libros.find((libro) => libro.id === id)
            carrito.push(libroSeleccionado)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            Swal.fire({
                title: '<span style="color:#4CAF50;">Libro agregado al carrito</span>',
                text: `${libroSeleccionado.titulo} ha sido añadido al carrito.`,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-success',
                    title: 'sweetalert-title-class',
                },
                showClass: {
                    popup: 'animated fadeInDown faster'
                },
                hideClass: {
                    popup: 'animated fadeOutUp faster'
                },
                timer: 1000,
                showConfirmButton: false,
            });
        })
    })
}

function mostrarCarrito() {
    const carritoContenedor = document.createElement("div");
    carritoContenedor.innerHTML = "<h3>Carrito de Compras</h3>";
    if (carrito.length > 0) {
        carrito.forEach((item) => {
            const itemHTML = `
                <div class="carrito-item">
                    <div>${item.titulo}</div>
                    <div>${item.precio}</div>
                    <button class="btn btn-outline-danger" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            carritoContenedor.innerHTML += itemHTML;
        });

        carritoContenedor.innerHTML += `
            <div class="carrito-total">
                <strong>Total:</strong> ${calcularTotal()}
            </div>
            <button class="btn btn-success" id="btnComprar">Comprar</button>
            <button class="btn btn-outline-secondary" id="btnCancelar">Cancelar</button>
        `;
    } else {
        carritoContenedor.innerHTML += "<p>El carrito está vacío.</p>";
    }

    contenedor.innerHTML = "";
    contenedor.appendChild(carritoContenedor);

    const btnEliminar = document.querySelectorAll(".carrito-item button");
    btnEliminar.forEach((btn) => {
        btn.addEventListener("click", eliminarDelCarrito);
    });

    const btnComprar = document.getElementById("btnComprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", comprar);
    }

    const btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", cancelar);
    }
}

function eliminarDelCarrito(e) {
    const id = parseInt(e.target.dataset.id);
    const index = carrito.findIndex((item) => item.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precio, 0);
}

function limpiarCarrito() {
    carrito.length = 0;
    localStorage.removeItem("miCarrito");
}

function comprar() {
    Swal.fire({
        title: 'Compra realizada',
        text: '¡Gracias por tu compra!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'btn btn-success',
        },
    }).then(() => {
        limpiarCarrito();
        window.location.href = 'index.html';
    });
}

function cancelar() {
    Swal.fire({
        title: 'Compra cancelada',
        text: 'Tu carrito ha sido vaciado.',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'btn btn-info',
        },
    }).then(() => {
        limpiarCarrito();
        window.location.href = 'index.html';
    });
}
function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) || []
}

btnCarrito.addEventListener("click", () => {
    mostrarCarrito();
})
