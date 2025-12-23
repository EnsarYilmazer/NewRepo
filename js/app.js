// Seçiciler
const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search-input');
const homeLink = document.getElementById('home-link');
const favLink = document.getElementById('fav-link');

let allMovies = [];

// VERİ ÇEKME (Zorunlu Gereksinim: fetch & async/await) [cite: 48, 49]
const loadMovies = async () => {
    try {
        const response = await fetch('./data/movies.json');
        allMovies = await response.json();
        displayMovies(allMovies);
    } catch (err) {
        console.error("Veri yüklenemedi:", err);
    }
};

// FİLMLERİ LİSTELEME (Zorunlu Gereksinim: DOM Manipulation) [cite: 50]
const displayMovies = (movies) => {
    movieContainer.innerHTML = ''; 
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.gorsel}" alt="${movie.ad}">
            <h3>${movie.ad}</h3>
            <p>${movie.yil} - ${movie.tur}</p>
            <button onclick="showDetail(${movie.id})">Detay</button>
            <button onclick="addToFav(${movie.id})">❤️</button>
        `;
        movieContainer.appendChild(card);
    });
};

// DETAY SAYFASI (Zorunlu Gereksinim: SPA Mantığı) [cite: 26]
window.showDetail = (id) => {
    const movie = allMovies.find(m => m.id === id);
    movieContainer.innerHTML = `
        <div class="detail-page">
            <button onclick="displayMovies(allMovies)">Geri Dön</button>
            <h2>${movie.ad}</h2>
            <p><strong>Puan:</strong> ${movie.puan}</p>
            <p>${movie.ozet}</p>
        </div>
    `;
};

// FAVORİLERE EKLEME (Zorunlu Gereksinim: localStorage) [cite: 28, 52]
window.addToFav = (id) => {
    let favs = JSON.parse(localStorage.getItem('myFavs')) || [];
    const movie = allMovies.find(m => m.id === id);
    if(!favs.some(m => m.id === id)) {
        favs.push(movie);
        localStorage.setItem('myFavs', JSON.stringify(favs));
        alert("Favorilere eklendi!");
    }
};

// ARAMA FONKSİYONU [cite: 24]
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allMovies.filter(m => m.ad.toLowerCase().includes(term));
    displayMovies(filtered);
});

// FAVORİLERİ GÖSTER
favLink.addEventListener('click', () => {
    const favs = JSON.parse(localStorage.getItem('myFavs')) || [];
    displayMovies(favs);
});

loadMovies();
