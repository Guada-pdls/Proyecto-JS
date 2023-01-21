const darkmode = document.querySelector("#darkmode")
const body = document.querySelector("body")
let estado = 0;

function colorearBoton() {
    (estado === 0) ? darkmode.classList.add("btn-dark") : (darkmode.classList.add("btn-light"), darkmode.classList.remove("btn-dark"))
}

(localStorage.getItem("darkmode") === "true") ? (activarModoOscuro(), estado = 1, darkmode.textContent = "Modo claro") : desactivarModoOscuro();
colorearBoton()

darkmode.addEventListener("click", (e)=>{
    (estado === 0) ? (activarModoOscuro(), estado = 1, darkmode.textContent = "Modo claro", colorearBoton()) : (desactivarModoOscuro(), estado = 0, darkmode.textContent = "Modo oscuro", colorearBoton());
    (body.classList.contains("modo-oscuro")) ? localStorage.setItem("darkmode", true) : localStorage.setItem("darkmode", false)
})

// Initialize Swiper

const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });