import { loadLastOpenedFiles } from './loadLastOpenedFiles.js';

// Load the last opened files when the page loads
window.addEventListener("load", () => {
  loadLastOpenedFiles();
});
