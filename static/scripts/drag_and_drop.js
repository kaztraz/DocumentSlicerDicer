import { uploadPdf } from "./uploadPdf.js";

export function initDragAndDrop(dropZone) {
  console.log(dropZone);
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragOver(e) {
    console.log("onDragOver");
    preventDefaults(e);
    dropZone.classList.add("dragover");
  }

  function onDragLeave(e) {
    console.log("onDragLeave")
    preventDefaults(e);
    dropZone.classList.remove("dragover");
  }

  function onDrop(e) {
    console.log("onDrop");
    preventDefaults(e);
    dropZone.classList.remove("dragover");

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 1 && files[0].type === "application/pdf") {
      const form = document.getElementById("upload-form");
      const fileInput = form.querySelector('input[name="pdf_file"]');
      fileInput.files = e.dataTransfer.files;

      // Call the uploadPdf function after setting the file input
      uploadPdf();
    }
  }

  // Event listeners
  dropZone.addEventListener("dragover", onDragOver);
  dropZone.addEventListener("dragleave", onDragLeave);
  dropZone.addEventListener("drop", onDrop);

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, preventDefaults);
  });
}
