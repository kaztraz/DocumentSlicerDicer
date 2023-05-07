function displayThumbnails(thumbnailPaths) {
  const thumbnailContainer = document.getElementById('thumbnails');
  thumbnailContainer.innerHTML = '';
  let previousThumbnail = null;

  for (const thumbnailPath of thumbnailPaths) {
    const thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.classList.add('thumbnail-wrapper');

    const img = document.createElement('img');
    img.src = thumbnailPath;
    img.className = 'thumbnail';
    thumbnailWrapper.appendChild(img);

    thumbnailContainer.appendChild(thumbnailWrapper);

    if (previousThumbnail) {
      if (img.offsetTop === previousThumbnail.offsetTop) {
        thumbnailWrapper.style.marginLeft = `${previousThumbnail.offsetWidth}px`;
      }
    }

    previousThumbnail = thumbnailWrapper;
  }

  cascadeThumbnails();
}

export { displayThumbnails };
