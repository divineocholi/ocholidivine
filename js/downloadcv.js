document.addEventListener('DOMContentLoaded', function() {
  const downloadLink = document.getElementById('download-link');
  const downloadAnimation = document.getElementById('download-animation');

  downloadLink.addEventListener('click', function(event) {
    // Prevent the default link behavior for a moment to play the animation
    event.preventDefault();

    // Start the animation
    downloadAnimation.classList.add('active');

    // After a delay, trigger the actual download
    setTimeout(() => {
      // Create a temporary link element
      const tempLink = document.createElement('a');
      tempLink.href = downloadLink.href;
      tempLink.download = downloadLink.download;

      // Programmatically click the temporary link to start the download
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      // Clean up the animation
      downloadAnimation.classList.remove('active');
    }, 1000); // This delay should match your CSS transition duration
  });
});