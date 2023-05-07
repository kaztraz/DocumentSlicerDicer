// ui.js - initialization code

function initUI() {
  // Set up the UI here, e.g. create buttons, sliders, etc.

  // Add event listeners for UI elements
  const fileInput = document.querySelector('input[name="pdf_file"]');
  fileInput.addEventListener('change', () => {
    const form = fileInput.closest('form');
    form.submit();
  });

  const uploadForm = document.getElementById('upload-form');
  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Call the uploadPdf function here, after preventing default form submission behavior
    uploadPdf();
  });

  const zoomSlider = document.getElementById('zoom');
  zoomSlider.addEventListener('input', () => {
    // Call the adjustZoom function here
    adjustZoom();
  });
}

export { initUI };


// ui-behaviors.js - specific UI behaviors

import { uploadPdf } from './uploadPdf.js';
import { adjustZoom } from './adjustZoom.js';

export function initializeUIBehaviors() {
  // Define specific UI behaviors here, e.g. showing/hiding elements, animating elements, etc.
}
