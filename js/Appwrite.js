document.addEventListener("DOMContentLoaded", () => {
    // ... (your existing code for testimonials, etc.)

    // Appwrite IDs for the new newsletter collection
    const newsletterCollectionId = "68b55364001a86939d74"; // Replace with your new collection ID

    // Handle newsletter form submission
    document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevents the page from reloading
        const emailInput = document.getElementById("newsletterEmail");
        const email = emailInput.value;

        try {
            // Save the email to the new Appwrite collection
            await databases.createDocument(dbId, newsletterCollectionId, Appwrite.ID.unique(), {
                email: email
            });

            // Provide user feedback
            emailInput.value = ""; // Clear the input field
            alert("✅ Thank you for subscribing!");

        } catch (err) {
            console.error("❌ Failed to save email:", err);
            alert("❌ Failed to subscribe. Please try again.");
        }
    });

});