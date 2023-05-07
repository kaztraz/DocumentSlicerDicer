async function uploadPdf(event) {
  if (event) {
    event.preventDefault();
  }
  const form = document.getElementById("upload-form");
  const formData = new FormData(form);
  const fileInput = form.querySelector('input[name="pdf_file"]');
  const file = fileInput.files[0];

  const loader = document.getElementById("spinner");
  loader.style.display = "flex"; // Show the loader

  try {
    formData.append("pdf_file", file);
    const response = await fetch('/upload_pdf', {
      method: 'POST',
      body: formData,
    });
    const lastOpenedFilesInput = document.getElementById('lastOpenedFiles');
    let lastOpenedFiles = lastOpenedFilesInput.value && Array.isArray(JSON.parse(lastOpenedFilesInput.value)) ? JSON.parse(lastOpenedFilesInput.value) : [];

    lastOpenedFiles.push(file.name);
    if (lastOpenedFiles.length > 2) {
      lastOpenedFiles.shift(); // Remove the oldest file
    }

    lastOpenedFilesInput.value = JSON.stringify(lastOpenedFiles);
    const jsonResponse = await response.json();
    displayThumbnails(jsonResponse.thumbnail_paths);
    form.reset();
  } catch (error) {
    console.error("Error during PDF upload:", error);
  } finally {
    loader.style.display = 'none'; // Hide the loader
  }
}

export { uploadPdf };
