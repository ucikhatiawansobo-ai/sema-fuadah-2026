
// ==============================
// PEMBUKA WEBSITE
// ==============================

const introScreen = document.getElementById("introScreen");
const enterButton = document.getElementById("enterButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

enterButton.addEventListener("click", () => {
    introScreen.classList.add("hidden");

    // Musik mulai setelah pengunjung menekan tombol masuk.
    backgroundMusic.play()
        .then(() => {
            musicLabel.textContent = "Matikan Musik";
            musicButton.setAttribute("aria-label", "Matikan musik");
        })
        .catch(() => {
            musicLabel.textContent = "Putar Musik";
        });
});


// ==============================
// TOMBOL MUSIK
// ==============================

musicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                musicLabel.textContent = "Matikan Musik";
                musicButton.setAttribute("aria-label", "Matikan musik");
            })
            .catch(() => {
                musicLabel.textContent = "Musik Tidak Tersedia";
            });
    } else {
        backgroundMusic.pause();
        musicLabel.textContent = "Putar Musik";
        musicButton.setAttribute("aria-label", "Putar musik");
    }
});


// ==============================
// NAVIGASI HP
// ==============================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("active");

    menuToggle.textContent =
        navigation.classList.contains("active") ? "×" : "☰";
});

const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


// ==============================
// PENCARIAN BERITA DAN FILTER
// ==============================

const newsSearch = document.getElementById("newsSearch");
const newsFilter = document.getElementById("newsFilter");
const newsCards = document.querySelectorAll(".news-card");
const emptyMessage = document.getElementById("emptyMessage");

function filterNews() {
    const keyword = newsSearch.value.toLowerCase().trim();
    const category = newsFilter.value;

    let visibleCount = 0;

    newsCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesKeyword = text.includes(keyword);
        const matchesCategory =
            category === "semua" || cardCategory === category;

        if (matchesKeyword && matchesCategory) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    emptyMessage.style.display =
        visibleCount === 0 ? "block" : "none";
}

newsSearch.addEventListener("input", filterNews);
newsFilter.addEventListener("change", filterNews);


// ==============================
// MODAL BERITA
// ==============================

const newsModal = document.getElementById("newsModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeNewsModal = document.getElementById("closeNewsModal");

const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;

        newsModal.classList.add("show");
    });
});

closeNewsModal.addEventListener("click", () => {
    newsModal.classList.remove("show");
});

newsModal.addEventListener("click", event => {
    if (event.target === newsModal) {
        newsModal.classList.remove("show");
    }
});


// ==============================
// GALERI FOTO
// ==============================

const galleryItems = document.querySelectorAll(".gallery-item");
const imageModal = document.getElementById("imageModal");
const expandedImage = document.getElementById("expandedImage");
const closeImageModal = document.getElementById("closeImageModal");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        expandedImage.src = item.dataset.image;
        imageModal.classList.add("show");
    });
});

closeImageModal.addEventListener("click", () => {
    imageModal.classList.remove("show");
    expandedImage.src = "";
});

imageModal.addEventListener("click", event => {
    if (event.target === imageModal) {
        imageModal.classList.remove("show");
        expandedImage.src = "";
    }
});


// ==============================
// TUTUP MODAL DENGAN ESCAPE
// ==============================

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        newsModal.classList.remove("show");
        imageModal.classList.remove("show");
        expandedImage.src = "";
    }
});


// ==============================
// GAMBAR CADANGAN
// ==============================

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
        img.style.visibility = "hidden";
        img.parentElement.classList.add("image-unavailable");
    });
});
