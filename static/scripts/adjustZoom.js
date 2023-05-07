import { cascadeThumbnails } from './displayThumbnails.js';

function adjustZoom() {
  const zoomSlider = document.getElementById("zoom");
  const zoomValue = zoomSlider.value;
  const thumbnails = document.getElementsByClassName("thumbnail");

  for (let thumbnail of thumbnails) {
    const img = new Image();
    img.src = thumbnail.src;

    img.onload = function () {
      const pageWidth = this.width;
      const pageHeight = this.height;
      const scaledWidth = pageWidth * (zoomValue / 100);
      const scaledHeight = pageHeight * (zoomValue / 100);

      thumbnail.style.maxWidth = `${Math.min(scaledWidth, pageWidth)}px`;
      thumbnail.style.maxHeight = `${Math.min(scaledHeight, pageHeight)}px`;

      cascadeThumbnails();
    };
  }
}


export { adjustZoom };
