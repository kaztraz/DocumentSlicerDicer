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

      thumbnail.style.maxWidth = `${scaledWidth}px`;
      thumbnail.style.maxHeight = `${scaledHeight}px`;

      cascadeThumbnails();
    };
  }
}

export { adjustZoom };
