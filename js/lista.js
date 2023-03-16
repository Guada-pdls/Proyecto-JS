// Funciones

let carrito = [];
localStorage.getItem("carrito") == "null"
  ? (carrito = [])
  : (carrito = JSON.parse(localStorage.getItem("carrito")));

const mostrarProductos = (productos, nodo) => {
  productos.forEach((producto) => {
    const card = document.createElement("article");
    card.className = "m-3 d-flex justify-content-between tarjeta flex-nowrap";
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
        </div>`;
    nodo.appendChild(card);
  });
};

const activarModoOscuro = () => {
  const body = document.querySelector("body");
  const botones = document.querySelectorAll(".btn-primary");
  const cards = document.querySelectorAll(".card");
  const tarjetas = document.querySelectorAll(".tarjeta");
  body.classList.add("modo-oscuro");
  botones.forEach((boton) => {
    boton.classList.add("btn-dark");
  });
  cards.forEach((card) => {
    card.classList.add("dark-card");
  });
  tarjetas.forEach((tarjeta) => {
    tarjeta.classList.add("dark-card");
  });
};

const desactivarModoOscuro = () => {
  const body = document.querySelector("body");
  const botones = document.querySelectorAll(".btn-primary");
  const cards = document.querySelectorAll(".card");
  body.classList.remove("modo-oscuro");
  botones.forEach((boton) => {
    boton.classList.remove("btn-dark");
  });
  cards.forEach((card) => {
    card.classList.remove("dark-card");
  });
};

const vaciarContenedor = (contenedor) => {
  if (contenedor.hasChildNodes()) {
    while (contenedor.childNodes.length >= 1) {
      contenedor.removeChild(contenedor.firstChild);
    }
  }
};

const comprar = (productos) => {
  const main = document.querySelector("main");
  vaciarContenedor(main);
  main.className = "";
  const formCard = document.createElement("section");
  formCard.className = "d-flex flex-column";
  formCard.innerHTML = `
        <div class="d-flex justify-content-between w-100">
            <div class="d-flex justify-content-center w-100">
                <div class="d-flex flex-column mx-5 w-50 align-items-center">
                    <form action="" id="form-card" class="d-flex flex-column">
                        <h3 class="m-3 my-4 text-center">Complete sus datos</h3>
                        <input id="input-nombre" type="text" placeholder="Nombre y Apellido" class="form-control">
                        <input id="input-num" type="number" placeholder="Número de tarjeta" class="form-control">
                        <input id="input-expiracion" type="number" placeholder="Fecha de expiración" class="form-control">
                        <input id="input-codigo" type="number" placeholder="Código de seguridad" class="form-control">
                    </form>
                    <div class="container-card d-flex flex-column my-5 p-3">
                        <div class="creditCard">
                            <h4 class="card-title">creditCard</h4>
                            <h4 id="num-card">#### #### #### ####</h4>
                            <h4 id="nombre-card">Nombre Apellido</h4>
                            <div class="container-seguridad">
                                <h5 id="expiracion-card">**/**</h5>
                                <h5 id="codigo-card">****</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-productos-comprar"><h3 class="m-3 my-4 text-center">Resumen de compra</h3></div>
        </div>`;
  main.appendChild(formCard);

  const inputNombre = document.querySelector("#input-nombre");
  const inputNum = document.querySelector("#input-num");
  const inputExpiracion = document.querySelector("#input-expiracion");
  const inputCodigo = document.querySelector("#input-codigo");
  const nombre = document.querySelector("#nombre-card");
  const num = document.querySelector("#num-card");
  const expiracion = document.querySelector("#expiracion-card");
  const codigo = document.querySelector("#codigo-card");

  const espaciarNumeroTarjeta = (valor) => {
    const espaciado = [...valor];
    espaciado.splice(4, 0, " ");
    espaciado.splice(9, 0, " ");
    espaciado.splice(14, 0, " ");
    return espaciado.join("");
  };
  const validarExpiracion = (valor) => {
    const expiracion = [...valor];
    expiracion.splice(2, 0, "/");
    return expiracion.join("");
  };
  const numeros = /^[0-9]+$/gm;

  let campoNombre;
  let campoNum;
  let campoExpiracion;
  let campoCodigo;

  inputNombre.addEventListener("input", () => {
    const letras = /^[a-zA-Z\s]+$/gm;
    if (inputNombre.value == "") {
      nombre.textContent = "Nombre Apellido";
    } else if (inputNombre.value.length < 29 && inputNombre.value.length > 5) {
      nombre.textContent = inputNombre.value;
      inputNombre.value.match(letras)
        ? (campoNombre = true)
        : (campoNombre = false);
    }
  });
  inputNum.addEventListener("input", () => {
    inputNum.value.length > 16 || inputNum.value == ""
      ? (num.textContent = "#### #### #### ####")
      : (num.textContent = espaciarNumeroTarjeta(inputNum.value));
    if (inputNum.value.length === 16 && inputNum.value.match(numeros)) {
      campoNum = true;
    } else {
      campoNum = false;
    }
  });
  inputExpiracion.addEventListener("input", () => {
    const anioActual = new Date().getFullYear();

    if (inputExpiracion.value === "" || inputExpiracion.value.length > 4) {
      expiracion.textContent = "**/**";
    } else if (
      inputExpiracion.value.slice(0, 2) > 12 ||
      inputExpiracion.value.slice(0, 2) < 1 ||
      inputExpiracion.value.slice(2) < String(anioActual).slice(2)
    ) {
      expiracion.textContent = "**/**";
    } else {
      expiracion.textContent = validarExpiracion(inputExpiracion.value);
      campoExpiracion = true;
    }
  });
  inputCodigo.addEventListener("input", () => {
    inputCodigo.value.length > 4 || inputCodigo.value === ""
      ? (codigo.textContent = "****")
      : (codigo.textContent = inputCodigo.value);
    if (inputCodigo.value.length === 4 && inputCodigo.value.match(numeros)) {
      campoCodigo = true;
    }
  });

  const contenedorProductos = document.querySelector(
    ".container-productos-comprar"
  );

  let total = 0;

  if (Object.prototype.toString.call(productos) === "[object Array]") {
    // Carrito

    for (const producto of productos) {
      const cardComprar = document.createElement("article");
      cardComprar.className = "card card-comprar m-3";
      cardComprar.id = producto[2];
      cardComprar.innerHTML = `
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title text-left px-3 pt-3">${producto[0]}</h5>
                    <p class="px-3 pt-3">x${producto[3]}</p>
                  </div>
                  <h7 class="card-subtitle p-3">USD ${producto[1]}</h7>
                `;
      contenedorProductos.appendChild(cardComprar);
      total += producto[3] * producto[1];
    }
  } else if (Object.prototype.toString.call(productos) === "[object Object]") {
    // Item
    const cardComprar = document.createElement("article");
    cardComprar.className = "card card-comprar m-3";
    cardComprar.id = productos.id;
    cardComprar.innerHTML = `
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title text-left px-3 pt-3">${productos.title}</h5>
                  </div>
                  <div class="d-flex justify-content-between pt-3">
                    <h7 class="card-subtitle p-3">USD ${productos.price}</h7>
                  </div>
                `;
    contenedorProductos.appendChild(cardComprar);
    total = productos.price;
  }

  const contenedorTotal = document.createElement("div");
  contenedorTotal.className = "m-4";
  contenedorTotal.textContent = `Total: USD ${total}`;
  contenedorProductos.appendChild(contenedorTotal);

  const completar = document.createElement("div");
  completar.className = "d-flex justify-content-center my-5";
  completar.innerHTML = `<button type="submit" class="btn btn-primary w-50">Completar compra</button>`;
  contenedorProductos.appendChild(completar);
  completar.addEventListener("click", (e) => {
    e.preventDefault();
    if (campoNombre && campoNum && campoExpiracion && campoCodigo) {
      Swal.fire({
        icon: "success",
        title: "¡Gracias por tu compra!",
        html: "Este cuadro se cerrará en <b></b> milisegundos.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      vaciarContenedor(main);
      setTimeout(() => location.reload(), 3200);
      localStorage.setItem("carrito", JSON.stringify([]));
    } else {
      Swal.fire({
        icon: "error",
        title: "Datos incorrectos",
      });
    }
  });

  localStorage.getItem("darkmode") === "true"
    ? activarModoOscuro()
    : desactivarModoOscuro();
};

const filtros = (filtroElegido, productos) => {
  let coincidencias = [];
  for (let producto of productos) {
    if (producto.category === filtroElegido) {
      coincidencias.push(producto);
    }
  }
  vaciarContenedor(contenedor);
  mostrarProductos(coincidencias, contenedor);
  let botones = document.querySelectorAll(".btn-primary");
  botonesProductos(botones, productos);
};

const mensajeAgregar = () => {
  Toastify({
    text: "Agregado correctamente ✅",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#0d6efd",
    },
  }).showToast();
};

const Carrito = () => {
  localStorage.getItem("carrito") == "null"
    ? (carrito = [])
    : (carrito = JSON.parse(localStorage.getItem("carrito")));
  if (carrito.length !== 0) {
    for (let producto of carrito) {
      const cardCarrito = document.createElement("div");
      cardCarrito.className = "card card-carrito m-3";
      cardCarrito.id = producto[2];
      cardCarrito.innerHTML = `
            <article>
              <div class="d-flex justify-content-between">
                <h5 class="card-title px-3 pt-3">${producto[0]}</h5>
                <p class="px-3 pt-3">x${producto[3]}</p>
              </div>
              <div class="d-flex justify-content-between pt-3">
                <h7 class="card-subtitle px-3">USD ${producto[1]}</h7>
                <button class="btn btn-primary m-1" id="eliminar-${producto[2]}">X</button>
              </div>
            </article>
            `;
      contenedor.appendChild(cardCarrito);
    }
    let total = 0;
    carrito.forEach((producto) => {
      const subtotal = producto[1] * producto[3]; // precio x cantidad
      total += subtotal;
    });
    contenedor.innerHTML += `
        <div class="d-flex justify-content-between w-100">
            <div class="ms-3">Total: USD ${total}</div>
            <button" id="comprar-carrito" class="btn btn-success me-3">Comprar</button>
        </div>
        <button id="delete" class="btn btn-danger m-5 ">Eliminar todo</button>`;
    eliminarTodo();
    const btnComprarCarrito = document.querySelector("#comprar-carrito");
    btnComprarCarrito.addEventListener("click", () => {
      comprar(carrito);
    });
  } else {
    contenedor.innerHTML = `<p class="p-5">Aún no hay artículos seleccionados</p>
        <a href="./productos.html" class="btn btn-secondary">Volver a la tienda</a>`;
  }
};

const agregarAlCarrito = (producto) => {
  localStorage.getItem("carrito") == "null"
    ? (carrito = [])
    : (carrito = JSON.parse(localStorage.getItem("carrito")));

  if (carrito) {
    for (let produ of carrito) {
      if (produ[2] == producto.id) {
        if (produ[3] === undefined) {
          produ[3] = 1;
          return localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
          produ[3] = produ[3] + 1;
          return localStorage.setItem("carrito", JSON.stringify(carrito));
        }
      }
    }
  }

  const datosProducto = [producto.title, producto.price, producto.id, 1];
  carrito.push(datosProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const eliminarDelCarrito = (indiceProducto) => {
  if (carrito[indiceProducto][3] === 1) {
    indiceProducto == 0 ? carrito.shift() : carrito.splice(indiceProducto, 1);
  } else {
    carrito[indiceProducto][3] = carrito[indiceProducto][3] - 1;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const eliminarTodo = () => {
  const btn = document.querySelector("#delete");
  btn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Carrito();
  });
  btn.className = "btn btn-danger m-5";
};

const validarForm = (nam, last, mail, msg) => {
  let error = [];
  if (nam.value.length < 4) {
    error[0] = true;
    error[1] = "El nombre no puede contener menos de 4 caracteres";
    return error;
  } else if (nam.value.length > 40 || last.value.length > 40) {
    error[0] = true;
    error[1] = "El nombre no puede contener mas de 40 caracteres";
    return error;
  } else if (last.value.length < 3) {
    error[0] = true;
    error[1] = "El apellido no puede contener menos de 3 caracteres";
    return error;
  } else if (last.value.length > 40) {
    error[0] = true;
    error[1] = "El apellido no puede contener mas de 40 caracteres";
    return error;
  } else if (
    mail.value.length < 5 ||
    mail.value.length > 40 ||
    mail.value.indexOf("@") == -1 ||
    mail.value.indexOf(".") == -1
  ) {
    error[0] = true;
    error[1] = "El correo es inválido";
    return error;
  } else if (msg.value.length < 4) {
    error[0] = true;
    error[1] = "El mensaje no puede contener menos de 4 caracteres";
    return error;
  }
  error[0] = false;
  return error;
};
