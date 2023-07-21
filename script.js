const cards = document.querySelectorAll(".card");
const searchInput = document.querySelector(".search input[type=text]");

function searchCards() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase('tr-TR'); // Türkçe karakterleri de dikkate alarak küçük harfe çeviriyoruz
  cards.forEach((card) => {
    const title = card.querySelector(".overlay h2").innerText.toLocaleLowerCase('tr-TR'); // Kart başlığını da Türkçe karakterleri dikkate alarak küçük harfe çeviriyoruz
    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Gerçek zamanlı arama için searchInput'e "keyup" olayını dinleyelim.
searchInput.addEventListener("keyup", () => {
  searchCards();
});
