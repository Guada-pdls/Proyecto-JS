const contenedor = document.querySelector("#productos-carrito")

Carrito()
let botones = document.querySelectorAll(".btn");

(localStorage.getItem("darkmode") === "true") ? activarModoOscuro() : desactivarModoOscuro()

function eliminarProductos(boton) {
    for (let producto of carrito) {
        let productoId = boton.id.slice(9)
        if (parseInt(productoId) === producto[2]){
            let indice = carrito.findLastIndex(product => product[2] === parseInt(productoId))
            eliminarDelCarrito(indice);
            
            vaciarContenedor(contenedor);
            Carrito();
            botones = document.querySelectorAll(".btn");
            botonesCarrito();
            (localStorage.getItem("darkmode") === "true") ? activarModoOscuro() : desactivarModoOscuro();
        }
    };
}

const botonesCarrito = () => {
    for (let boton of botones) 
        boton.addEventListener("click", ()=>{
            eliminarProductos(boton)
        })
    }

botonesCarrito()