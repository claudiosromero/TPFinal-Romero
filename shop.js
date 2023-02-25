let stockProductos = [
    { id: 1, nombre: "Robert Gamer", tipo: "maceta", cantidad: 1, desc: "Ideal para hacer compania en esas largar noches de mucho vicio", precio: 2000, tamaño: "13 cm", img: './img/robert_gamer.jpg' },
    { id: 2, nombre: "Goku SS3", tipo: "figura", cantidad: 1, desc: "Increible replica del SS3!!!", precio: 5100, tamaño: "20 cm", img: './img/goku.jpg' },
    { id: 3, nombre: "Messi", tipo: "figura", cantidad: 1, desc: "Nada que decir! no lo queres... LO NECESITAS!", precio: 1200, tamaño: "10 cm", img: './img/messi.jpg' },
    { id: 4, nombre: "Pokemon", tipo: "maceta", cantidad: 1, desc: "Si sos fan de Pokemon, tenes que tenerla!", precio: 1400, tamaño: "10 cm", img: './img/pokemon.jpg' },

]

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');

const totalCompra = document.getElementById('totalCompra');


// ALERTA
const comprar = document.getElementById('boton-carrito');

const botonVaciar = document.getElementById('vaciar-carrito');




let carrito = [];



document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        alctualizaCarrrito()
    }
});

botonVaciar.addEventListener('click', function () {
    carrito.length = 0
    alctualizaCarrrito()
    localStorage.clear()
    alctualizaCarrrito()

});


stockProductos.forEach(function (producto) {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Tamaño: ${producto.tamaño}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    //selecciono el boton
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', function () {
        agregarAlCarrito(producto.id)
    });


});

function agregarAlCarrito(productoId) {

    const acumular = carrito.some(function (prod) {
        return prod.id === productoId
    })

    if (acumular) {
        const prod = carrito.map(function (prod) {
            if (prod.id === productoId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find(function (prod) {
            return prod.id === productoId
        })
        carrito.push(item)
        alctualizaCarrrito()
        console.log(carrito)

    }

    alctualizaCarrrito()

};

function eliminarDelCarrito(productoId) {
    const item = carrito.find(function (prod) {
        return prod.id === productoId
    })
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    alctualizaCarrrito()

};





function alctualizaCarrrito() {

    contenedorCarrito.innerHTML = ""

    carrito.forEach(function (prod) {
        const fila = document.createElement('tr')
        fila.className = ('productoEnCarrito')
        fila.innerHTML =
            `
<td><img src="${prod.img}"</td>
<td>${prod.nombre}</td>
<td><span id="cantidad">${prod.cantidad}</span></td>
<td>${prod.precio * prod.cantidad}</td>
<button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
`
        contenedorCarrito.appendChild(fila)
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length
    totalCompra.innerText = carrito.reduce((accc, prod) => accc + prod.precio * prod.cantidad, 0)

};


// ALERTA

comprar.addEventListener("click", function () {
    if (carrito.length === 0) {
        Swal.fire({
            title: "¡Carrito vacio!",
            text: "Agrega productos para continuar con la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
    } else {
        Swal.fire({
            title: "¡Gracias por su Compra!",
            icon: "success",
            confirmButtonText: "Aceptar",
        })
    }
});

// API

