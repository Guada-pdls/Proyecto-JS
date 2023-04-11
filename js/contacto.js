localStorage.getItem("darkmode") === "true"
  ? activarModoOscuro()
  : desactivarModoOscuro();

const form = document.querySelector("#form");
const nam = document.querySelector("#nam");
const last = document.querySelector("#last");
const mail = document.querySelector("#mail");
const msg = document.querySelector("#msg");
const btn = document.querySelector("#button");
const resultado = document.querySelector(".resultado");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let error = validarForm(nam, last, mail, msg);
  if (error[0]) {
    resultado.innerHTML = error[1];
    resultado.classList.add("red");
  } else {
    resultado.classList.remove("red");
    resultado.innerHTML = "";
    btn.value = "Enviando...";

    const serviceID = "service_sskpjyu";
    const templateID = "template_6bk379u";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Enviar";
        Swal.fire("", "Mensaje enviado correctamente", "success");
      },
      (err) => {
        btn.value = "Enviar";
        alert(JSON.stringify(err));
      }
    );
  }
});
