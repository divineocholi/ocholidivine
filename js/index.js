document.addEventListener("DOMContentLoaded", () => {
  // Appwrite setup
  const client = new Appwrite.Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("68b07bcd0030b6ff9202");

  const databases = new Appwrite.Databases(client);
  const storage = new Appwrite.Storage(client);

  // Appwrite IDs
  const dbId = "68b07cd80039e6b6a912";
  const collectionId = "68b0be330003bb20b056";
      const newsletterCollectionId = "68b55364001a86939d74"; // Replace with your new collection ID
  const bucketId = "68b08630000e0214748f";

  async function loadReviews() {
    const reviewsContainer = document.querySelector(".testimonial-track");
    const indicatorContainer = document.querySelector(".testimonial-indicator");

    if (!reviewsContainer) {
      console.error("Reviews container not found.");
      return;
    }

    try {
      // Fetch all reviews
      const res = await databases.listDocuments(dbId, collectionId);

      // Clear container + indicators
      reviewsContainer.innerHTML = "";
      indicatorContainer.innerHTML = "";

      // Loop through each review
      res.documents.forEach((review) => {
      
        let imgTag = "";     
     if (review.images && review.images.length > 0) {
      const fileId = review.images[0];  // get first image ID
      const imageURL = storage.getFileDownload(bucketId, fileId).href;
       imgTag = `<img src="${imageURL}" alt="${review.name}" class="testimonial-img" />`;
        } else {
        imgTag = `<img src="images/testimonialimg" alt="No image" class="testimonial-img" />`;
        }

        const starsCount = review.stars || 0;
        const stars = "★".repeat(starsCount);

        const card = `
          <div class="testimonial-content">
            ${imgTag}
            <h4>${review.name || "Anonymous"}</h4>
            <p>${review.message || ""}</p>
            <div class="stars">${stars}</div>
          </div>
        `;
        reviewsContainer.innerHTML += card;
      });

      // ✅ Initialize slider after adding reviews
      initSlider();
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  }

  function initSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-content');
    const indicatorContainer = document.querySelector('.testimonial-indicator');

    if (slides.length === 0) return;

    // Clear old indicators
    indicatorContainer.innerHTML = "";

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        showSlide(currentIndex);
      });
      indicatorContainer.appendChild(dot);
    });

    const indicators = indicatorContainer.querySelectorAll("span");
    let currentIndex = 0;

    function showSlide(index) {
      track.style.transform =` translateX(-${index * 100}%)`;
      indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 4000);
  }

  // Load reviews when page is ready
  loadReviews();


// Handle newsletter form submission
    document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("newsletterEmail");
        const email = emailInput.value;

        // Add this function to your index.js file, inside the DOMContentLoaded event listener
function showCustomAlert(message) {
    const customAlert = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    customAlert.classList.add("show");

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
        customAlert.classList.remove("show");
    }, 3000);
}

// In your newsletter form's try block, replace the alert() ca
try {
    // Check if an email with this value already exists
    const existingEmails = await databases.listDocuments(
        dbId,
        newsletterCollectionId,
        [Appwrite.Query.equal("newsletter", email)]
    );

    // If documents are returned, the email already exists
    if (existingEmails.documents.length > 0) {
        showCustomAlert("❌ You have already signed up with this email.");
    } else {
        // If the email is unique, proceed to create a new document
        await databases.createDocument(
            dbId,
            newsletterCollectionId,
            Appwrite.ID.unique(), {
                newsletter: email
            }
        );

        emailInput.value = "";
        showCustomAlert("✅ Thank you for subscribing!");
    }
} catch (err) {
    console.error("❌ Failed to save email:", err);
    showCustomAlert("❌ Failed to subscribe. Please try again.");
}
});
});




