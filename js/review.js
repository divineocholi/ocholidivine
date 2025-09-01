// import * as Appwrite from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0";

// Appwrite Setup
const client = new Appwrite.Client()
  .setEndpoint( "https://fra.cloud.appwrite.io/v1")
  .setProject("68b07bcd0030b6ff9202");

const databases = new Appwrite.Databases(client);
const storage = new Appwrite.Storage(client);

const dbId = "68b07cd80039e6b6a912";
const collectionId = "68b0be330003bb20b056";
const bucketId = "68b08630000e0214748f";

// Star rating logic
const stars = document.querySelectorAll("#starRating span");
const starInput = document.getElementById("stars");
stars.forEach(star => {
  star.addEventListener("click", () => {
    starInput.value = star.dataset.star;
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < star.dataset.star; i++) {
      stars[i].classList.add("active");
    }
  });
});

// Handle form submission
document.getElementById("reviewForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("status");

  try {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const starValue = parseInt(starInput.value);
    const imageFile = document.getElementById("image").files[0];

    let imageId = null;
    if (imageFile) {
      const upload = await storage.createFile(bucketId, Appwrite.ID.unique(), imageFile);
      imageId = upload.$id;
    }

    await databases.createDocument(dbId, collectionId, Appwrite.ID.unique(), {
      name,
      message,
      stars: starValue,
      images: [imageId]
    });

    status.textContent = "✅ Review submitted successfully!";
    status.style.color = "green";
    e.target.reset();
    stars.forEach(s => s.classList.remove("active"));
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Failed to submit review.";
    status.style.color = "red";
  }
});