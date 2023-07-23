const filmContainer = document.getElementById("filmContainer");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.querySelector('input[type="text"]');
const filmCountElement = document.getElementById("filmCount");

let films = [];
let totalFilmCount = 0;

function createFilmCard(film) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = film.imageUrl;
  card.appendChild(image);

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  card.appendChild(overlay);

  const title = document.createElement("h2");
  title.textContent = film.title;
  overlay.appendChild(title);

  const formatSize = document.createElement("p");
  formatSize.textContent = `${film.format} - ${film.size}`;
  overlay.appendChild(formatSize);

  const quality = document.createElement("p");
  quality.textContent = `Kalite: ${film.quality}`;
  overlay.appendChild(quality);

  const language = document.createElement("p");
  language.textContent = `Dil: ${film.language}`;
  overlay.appendChild(language);

  const downloadLink = document.createElement("a");
  downloadLink.href = film.downloadLink;
  downloadLink.target = "_blank";
  downloadLink.textContent = "Download";
  downloadLink.classList.add("download-btn");
  overlay.appendChild(downloadLink);

  // Kategorileri data-categories özelliğiyle kartlara ekleyin
  card.setAttribute("data-categories", JSON.stringify(film.categories));

  filmContainer.appendChild(card);
}

function fetchFilms() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        films = JSON.parse(xhr.responseText);
        totalFilmCount = films.length; // Update the totalFilmCount based on the number of films fetched
        filmCountElement.textContent = totalFilmCount; // Display the film count on the webpage
        films.forEach(createFilmCard);
      } else {
        console.error("Failed to fetch films.");
      }
    }
  };
  xhr.open("GET", "films.json");
  xhr.send();
}

function filterCards() {
  const selectedCategory = categorySelect.value;
  const cards = document.querySelectorAll(".card");

  // Get the search query from the input field
  const searchQuery = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const filmTitle = card.querySelector("h2").textContent.toLowerCase();
    const filmCategories = JSON.parse(card.getAttribute("data-categories"));
    const titleMatch = filmTitle.includes(searchQuery);
    const categoryMatch =
      selectedCategory === "all" || filmCategories.includes(selectedCategory);

    if (titleMatch && categoryMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();

  categorySelect.addEventListener("change", filterCards);
  searchInput.addEventListener("input", filterCards);

  // Başlangıçta tüm filmleri göstermek için
  categorySelect.value = "all";
  filterCards();
});
