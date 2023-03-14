"use strict";

const contenedor = document.querySelector(".productos");
const buscador = document.querySelector("#buscador");
const btnBuscar = document.querySelector("#basic-addon1");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((productos) => {
    contenedor.removeChild(contenedor.firstChild);
    mostrarProductos(productos, contenedor);

    // Filtros

    document
      .querySelector("#menclothing")
      .addEventListener("click", () => filtros("men's clothing", productos));
    document
      .querySelector("#womenclothing")
      .addEventListener("click", () => filtros("women's clothing", productos));
    document
      .querySelector("#jewelery")
      .addEventListener("click", () => filtros("jewelery", productos));
    document
      .querySelector("#electronics")
      .addEventListener("click", () => filtros("electronics", productos));
    buscarProducto(productos);
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal...",
      text: "Por el momento los artículos no están disponibles.",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Volver a intentar",
      footer: `Error: ${error}`,
    }).then((result) => {
      if (result.isDismissed) {
        location.reload();
      }
    });
  });

localStorage.getItem("darkmode") === "true"
  ? activarModoOscuro()
  : desactivarModoOscuro();

const botonesProductos = (botones, productos) => {
  for (let boton of botones) {
    boton.addEventListener("click", (e) => {
      productos.forEach((producto) => {
        if (producto.id === parseInt(boton.id)) {
          agregarAlCarrito(producto);
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
        }
      });
    });
  }
};

//buscar productos

const buscarProducto = (productos) => {
  buscador.addEventListener("keyup", () => {
    const productoABuscar = buscador.value.toLowerCase();
    let productosEncontrados = [];
    for (const producto of productos) {
      if (producto.title.toLowerCase().includes(productoABuscar)) {
        productosEncontrados.push(producto);
      }
    }
    vaciarContenedor(contenedor);
    mostrarProductos(productosEncontrados, contenedor);
    const botones = document.querySelectorAll(".btn-primary");
    botonesProductos(botones, productos);
  });
};
