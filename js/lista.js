// Funciones

const mostrarProductos = (productos, nodo) => {
    productos.forEach(producto => {
        const card = document.createElement("div")
        card.className = "m-3 d-flex justify-content-between tarjeta flex-nowrap"
        card.innerHTML = `
        <div class="img me-3">
            <img src=${producto.image} alt="${producto.title}">
        </div>
        <div class="card-right">
            <div class="d-flex top-card justify-content-between">
                <h5 class="title">${producto.title}</h5>
                <p class="ps-3 pe-2 precio">USD ${producto.price}</p>
            </div>
            <p class="descrip">${producto.description}</p>
            <div class="d-flex justify-content-end align-items-baseline botones pe-4">
                <button class="btn btn-primary boton me-3" id="comprar-${producto.id}">Comprar</button>  
                <button class="btn btn-primary boton ms-2" id="${producto.id}">Añadir al carrito</button>
            </div>
        </div>`
        nodo.appendChild(card)
    })
}

const activarModoOscuro = () => {
    const body = document.querySelector("body")
    const botones = document.querySelectorAll(".btn-primary")
    const cards = document.querySelectorAll(".card")
    const tarjetas = document.querySelectorAll(".tarjeta")
    body.classList.add("modo-oscuro")
    botones.forEach( boton => { boton.classList.add("btn-dark") })
    cards.forEach( card => { card.classList.add("dark-card") })
    tarjetas.forEach ( tarjeta => { tarjeta.classList.add("dark-card") })
}

const desactivarModoOscuro = () => {
    const body = document.querySelector("body")
    const botones = document.querySelectorAll(".btn-primary")
    const cards = document.querySelectorAll(".card")
    body.classList.remove("modo-oscuro")
    botones.forEach( boton => { boton.classList.remove("btn-dark") })
    cards.forEach( card => { card.classList.remove("dark-card") })
};

const vaciarContenedor = contenedor => {
    if (contenedor.hasChildNodes()){
        while (contenedor.childNodes.length >= 1){
            contenedor.removeChild(contenedor.firstChild)
        }
    }
}

let carrito;
(localStorage.getItem("carrito") == null) ? carrito = [] : carrito = JSON.parse(localStorage.getItem("carrito"));

const filtros = (filtroElegido, productos) => {
    let coincidencias = [];
    for (let producto of productos) {
        if (producto.category === filtroElegido) {
            coincidencias.push(producto)
        }
    }
    vaciarContenedor(contenedor)
    mostrarProductos(coincidencias, contenedor)
}

const Carrito = () => {
    (localStorage.getItem("carrito") == null) ? carrito = [] : carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito.length !== 0) {
        for (let producto of carrito) {
            const cardCarrito = document.createElement("div")
            cardCarrito.className = "card card-carrito m-3"
            cardCarrito.id = producto[2]
            cardCarrito.innerHTML = `
            <div>
              <div class="d-flex justify-content-between">
                <h5 class="card-title px-3 pt-3">${producto[0]}</h5>
                <p class="px-3 pt-3">x${producto[3]}</p>
              </div>
              <div class="d-flex justify-content-between pt-3">
                <h7 class="card-subtitle px-3">USD ${producto[1]}</h7>
                <button class="btn btn-primary m-1" id="eliminar-${producto[2]}">X</button>
              </div>
            </div>
            `
            contenedor.appendChild(cardCarrito)
        }
        let total = 0
        carrito.forEach(producto => {
            const subtotal = producto[1] * producto[3] // precio x cantidad
            total += subtotal
        })
        contenedor.innerHTML += `
        <div class="d-flex justify-content-between w-100">
            <div class="ms-3">Total: USD ${total}</div>
            <button" class="btn btn-success me-3">Comprar</button>
        </div>
        <button id="delete" class="btn btn-danger m-5 ">Eliminar todo</button>`
        eliminarTodo()
    } else {
        contenedor.innerHTML = `<p class="p-5">Aún no hay artículos seleccionados</p>
        <a href="./productos.html" class="btn btn-secondary">Volver a la tienda</a>`
    }
}

const agregarAlCarrito = producto => {

    if (carrito){
        for (let produ of carrito) {
            if (produ[2] == producto.id){
                if (produ[3] === undefined){
                    produ[3] = 1
                    return localStorage.setItem("carrito", JSON.stringify(carrito))
                } else {
                    produ[3] = produ[3] + 1
                    return localStorage.setItem("carrito", JSON.stringify(carrito))
                }
            }
        }
    }
    
    const datosProducto = [producto.title, producto.price, producto.id, 1]
    carrito.push(datosProducto)    
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const eliminarDelCarrito = indiceProducto => {
    if ((carrito[indiceProducto][3]) === 1) {
        (indiceProducto == 0) ? carrito.shift() : carrito.splice(indiceProducto, 1);
    } else {
        carrito[indiceProducto][3] = carrito[indiceProducto][3] - 1
    }
    localStorage.setItem("carrito", JSON.stringify(carrito)) 
}

const eliminarTodo = () => {
    const btn = document.querySelector("#delete")
    btn.addEventListener("click", () => {
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        Carrito()
    })
    btn.className = 'btn btn-danger m-5';
}

const validarForm = (nam, last, mail, msg)=>{
    let error = [];
    if (nam.value.length < 4){
        error[0] = true;
        error[1] = "El nombre no puede contener menos de 4 caracteres"
        return error;
    } else if (nam.value.length > 40 || last.value.length > 40){
        error[0] = true;
        error[1] = "El nombre no puede contener mas de 40 caracteres"
        return error
    } else if (last.value.length < 3){
        error[0] = true;
        error[1] = "El apellido no puede contener menos de 3 caracteres"
        return error
    } else if (last.value.length > 40){
        error[0] = true;
        error[1] = "El apellido no puede contener mas de 40 caracteres"
        return error
    } else if (mail.value.length < 5 || mail.value.length > 40 || mail.value.indexOf("@") == -1 || mail.value.indexOf(".") == -1){
        error[0] = true;
        error[1] = "El correo es inválido"
        return error;
    } else if (msg.value.length < 4){
        error[0] = true;
        error[1] = "El mensaje no puede contener menos de 4 caracteres"
        return error;
    }
    error[0] = false;
    return error;
};