
// project
// Sample image data (replace src and links with yours)
const images = [
  { src: "images/ms faith.png", title: "Chuby's beauty salon", link: "https://divineocholi.github.io/chubysbeauty-salon/index.html", category: "brand" },
  { src: "images/royal.png", title: "Royal twist And Wigs", link: "https://onwuegbuzieokereke-commits.github.io/Royaltwistandbraids/index.h0tml", category: "brand" },
  { src: "images/uiux1.png", title: "UIUX Design", link: "#", category: "ui" },
  { src: "images/work2.jpeg", title: "UIUX Design", link: "#", category: "ui" },
  { src: "images/work3.jpeg", title: "UIUX Design", link: "#", category: "ui" },
  { src: "images/sockweb.jpg", title: "UIUX Design", link: "#", category: "ui" },
  { src: "images/work6.jpeg", title: "Coming Soon", link: "#", category: "web" },
  { src: "images/work7.jpeg", title: "Coming Soon", link: "#", category: "web" },
  // Add more items up to 70+ as needed...
];

const galleryGrid = document.getElementById("galleryGrid");
const viewMoreBtn = document.getElementById("viewMoreBtn");
const filterButtons = document.querySelectorAll(".gallery-filters button");

let itemsPerLoad = 12;
let extraLoad = 8;
let currentCount = 0;
let currentCategory = "all";
let filteredImages = images;

function createCard(img) {
  const card = document.createElement("div");
  card.className = "gallery-card";
  card.innerHTML = `
    <img src="${img.src}" alt="${img.title}">
    <div class="gallery-overlay">
      <h4>${img.title}</h4>
      <a href="${img.link}" target="_blank" style="color:white; text-decoration:underline;">View</a>
    </div>
  `;
  return card;
}

function renderImages(start, count) {
  const slice = filteredImages.slice(start, start + count);
  slice.forEach((img) => {
    const card = createCard(img);
    galleryGrid.appendChild(card);
  });
  currentCount += slice.length;

  // Hide or show button
  if (currentCount >= filteredImages.length) {
    viewMoreBtn.style.display = "none";
  } else {
    viewMoreBtn.style.display = "inline-block";
  }
}

function resetGallery(category) {
  currentCategory = category;
  currentCount = 0;
  filteredImages = category === "all" 
    ? images 
    : images.filter((img) => img.category === category);

  galleryGrid.innerHTML = "";
  renderImages(currentCount, itemsPerLoad);
}

// View More
viewMoreBtn.addEventListener("click", () => {
  renderImages(currentCount, extraLoad);
});

// Filter buttons
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    resetGallery(btn.dataset.filter);
  });
});

// Initial load
resetGallery("all");

