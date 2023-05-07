import { loadLastOpenedFiles } from './loadLastOpenedFiles.js';
import { initDragAndDrop } from './drag_and_drop.js';

// Load the last opened files when the page loads
window.addEventListener("load", () => {
  loadLastOpenedFiles();
});

document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("drop-zone");
  initDragAndDrop(dropZone);
});
