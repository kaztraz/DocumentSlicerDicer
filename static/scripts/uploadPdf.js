async function uploadPdf(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const fileInput = form.querySelector('input[name="pdf_file"]');
  const file = fileInput.files[0];

  loader.style.display = 'flex'; // show the loader

  formData.append('pdf_file', file);
  const response = await fetch('/upload_pdf', {
    method: 'POST',
    body: formData,
  });
  const lastOpenedFilesInput = document.getElementById('lastOpenedFiles');
  let lastOpenedFiles = lastOpenedFilesInput.value ? JSON.parse(lastOpenedFilesInput.value) : [];

  lastOpenedFiles.push(file.name);
  if (lastOpenedFiles.length > 2) {
    lastOpenedFiles.shift(); // Remove the oldest file
  }

  lastOpenedFilesInput.value = JSON.stringify(lastOpenedFiles);
  const jsonResponse = await response.json();
  displayThumbnails(jsonResponse.thumbnail_paths);
  form.reset();

  loader.style.display = 'none'; // hide the loader
}

export { uploadPdf };
