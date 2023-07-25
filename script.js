const filmContainer = document.getElementById("filmContainer");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.querySelector('input[type="text"]');
const filmCountElement = document.getElementById("filmCount");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let films = [];
let totalFilmCount = 0;
let filmsPerPage = 20;
let currentFilmIndex = 0;
let selectedCategory = "all";

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

        // Apply category filter
        if (selectedCategory !== "all") {
          films = films.filter((film) => film.categories.includes(selectedCategory));
        }

        totalFilmCount = films.length;
        filmCountElement.textContent = totalFilmCount;
        loadMoreFilms();
      } else {
        console.error("Failed to fetch films.");
      }
    }
  };
  xhr.open("GET", "films.json");
  xhr.send();
}


function filterCards() {
  const searchQuery = searchInput.value.trim().toLowerCase();

  const filteredFilms = films.filter((film) => {
    const filmTitle = film.title.toLowerCase();
    const filmCategories = film.categories.map((category) => category.toLowerCase());

    const titleMatch = filmTitle.includes(searchQuery);
    const categoryMatch = selectedCategory === "all" || filmCategories.includes(selectedCategory.toLowerCase());

    return titleMatch && categoryMatch;
  });

  // Clear the current film container
  filmContainer.innerHTML = "";

  // Create cards for the filtered films
  filteredFilms.forEach(createFilmCard);
}

function loadMoreFilms() {
  const filmsToShow = films.slice(currentFilmIndex, currentFilmIndex + filmsPerPage);
  filmsToShow.forEach(createFilmCard);
  currentFilmIndex += filmsPerPage;

  // Hide the "Load More" button if all films are displayed
  if (currentFilmIndex >= totalFilmCount) {
    loadMoreBtn.style.display = "none";
  }
}



document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();

  categorySelect.addEventListener("change", () => {
    selectedCategory = categorySelect.value; // Update the selected category
    currentFilmIndex = 0; // Reset currentFilmIndex when the category changes
    filmContainer.innerHTML = ""; // Clear existing cards when the category changes
    fetchFilms(); // Fetch films for the selected category
  });

  searchInput.addEventListener("input", filterCards);

  categorySelect.value = "all";
  filterCards();

  loadMoreBtn.addEventListener("click", loadMoreFilms);
});