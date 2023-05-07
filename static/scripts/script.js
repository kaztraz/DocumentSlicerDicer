import { loadLastOpenedFiles } from "./loadLastOpenedFiles.js";
import { adjustZoom } from "./adjustZoom.js";
import { displayThumbnails } from "./displayThumbnails.js";
import { uploadPdf } from "./uploadPdf.js";
import { initUI } from "./ui.js";
import { initializeUIBehaviors } from "./ui.js";
import { initDragAndDrop } from './drag_and_drop.js';

window.loadLastOpenedFiles = loadLastOpenedFiles;
window.adjustZoom = adjustZoom;
window.displayThumbnails = displayThumbnails;
window.uploadPdf = uploadPdf;

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  initializeUIBehaviors();
});

window.addEventListener("load", () => {
  const dropZone = document.querySelector("body");
  initDragAndDrop(dropZone);
});
