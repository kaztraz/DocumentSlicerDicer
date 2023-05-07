import { loadLastOpenedFiles } from './loadLastOpenedFiles.js';
import { adjustZoom } from './adjustZoom.js';
import { displayThumbnails } from './displayThumbnails.js';
import { uploadPdf } from './uploadPdf.js';

// Call the loadLastOpenedFiles() function when the application starts
loadLastOpenedFiles();

// Automatically submit the form when a file is chosen
const fileInput = document.querySelector('input[name="pdf_file"]');
fileInput.addEventListener('change', () => {
  const form = fileInput.closest('form');
  form.submit();
});

// Disable the default form submission behavior
const uploadForm = document.getElementById('upload-form');
uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Call the cascadeThumbnails() function when the user interacts with the zoom slider
const zoomSlider = document.getElementById('zoom');
zoomSlider.addEventListener('input', () => {
  adjustZoom();
});

// Call the displayThumbnails() function with the JSON response from the server
const jsonResponse = JSON.parse(document.getElementById('thumbnails-data').textContent);
displayThumbnails(jsonResponse.thumbnail_paths);

// Setup drag and drop
import { setupDragAndDrop } from './setupDragAndDrop.js';
window.addEventListener('load', setupDragAndDrop);
