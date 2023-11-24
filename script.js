const menuToggle = document.querySelector(".menu-toggle");
const wrapperList = document.querySelector(".wrapper-list");

menuToggle.addEventListener("click", (e) => {
  wrapperList.classList.toggle("slide");
});

function getCoffee() {
  fetch("./data/dataCoffee.json")
    .then((Response) => Response.json())
    .then((Response) => {
      const coffee = Response.menu;
      let cards = "";
      coffee.forEach((e) => (cards += myCard(e)));
      const wrapperCards = document.querySelector(".wrapper-card");
      wrapperCards.innerHTML = cards;
    });
}

getCoffee();

const containerKategori = document.querySelector(".kategori-menu");
containerKategori.addEventListener("click", function (e) {
  if (e.target.classList.contains("kategori-btn")) {
    const kategori = e.target.innerHTML;
    const headerKategori = document.querySelector(".header-kategori");
    headerKategori.innerHTML = kategori;
    if (kategori == "All menu") {
      getCoffee();
      return;
    }
    fetch("./data/dataCoffee.json")
      .then((Response) => Response.json())
      .then((Response) => {
        const coffee = Response.menu;
        let content = "";
        coffee.forEach((e) => {
          if (e.kategori == kategori) {
            content += myCard(e);
          }
        });
        const wrapperCards = document.querySelector(".wrapper-card");
        wrapperCards.innerHTML = content;
      });
  }
});

// saat tombol search di clik
const wrapperSearch = document.querySelector(".wrapper-search");
wrapperSearch.addEventListener("change", function (e) {
  const inputSearch = document.querySelector(".input-search").value;
  fetch("./data/dataCoffee.json")
    .then((Response) => Response.json())
    .then((Response) => {
      const coffee = Response.menu;
      let content = "";
      coffee.forEach((e) => {
        if (e.name.toLowerCase() === inputSearch) {
          content += myCard(e);
        } else if (e.kategori === inputSearch) {
          content += myCard(e);
        }
      });
      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = content;
    });
});


const myCard = (e) => {
  return `<div class="col-md-4 mb-5 gap-3">
    <div class="card" data-id="${e.id}">
      <img src="${e.poster}" class="card-img-top" alt="latte" />
      <div class="card-body">
        <h5 class="card-title">- ${e.name} -</h5>
        <p class="card-text fs-5 d-flex justify-content-between pe-5 ps-3"><span>IDR ${e.price}</span><i class="bi bi-cart3 text-dark"></i></p>
      </div>
    </div>
  </div>`;
};
