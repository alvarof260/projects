const links = document.querySelectorAll(".navbar_link");
const bg = document.querySelector(".bg-link");

links[0].classList.add("active");

for (let link of links) {
  link.addEventListener("click", function () {
    // Quitar la clase 'active' de todos los enlaces
    for (let otherLink of links) {
      otherLink.classList.remove("active");
    }

    // Agregar la clase 'active' al enlace que se ha hecho clic
    link.classList.add("active");

    bg.style.left = `${link.offsetLeft}px`;
    bg.style.width = `${link.offsetWidth}px`;
  });
}
