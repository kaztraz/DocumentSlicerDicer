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

function cascadeThumbnails() {
  const thumbnailWrappers = document.querySelectorAll('.thumbnail-wrapper');
  let rowTop = null;
  let rowHeight = 0;

  for (let i = 0; i < thumbnailWrappers.length; i++) {
    const thumbnailWrapper = thumbnailWrappers[i];
    if (!rowTop) {
      rowTop = thumbnailWrapper.offsetTop;
    }

    if (thumbnailWrapper.offsetTop > rowTop) {
      for (let j = i - 1; j >= 0; j--) {
        const previousThumbnailWrapper = thumbnailWrappers[j];
        if (previousThumbnailWrapper.offsetTop === rowTop) {
          thumbnailWrapper.style.marginLeft = `${previousThumbnailWrapper.offsetLeft + previousThumbnailWrapper.offsetWidth}px`;
          break;
        }
      }
      rowTop = thumbnailWrapper.offsetTop;
      rowHeight = thumbnailWrapper.offsetHeight;
    } else {
      rowHeight = Math.max(rowHeight, thumbnailWrapper.offsetHeight);
    }

    thumbnailWrapper.style.marginTop = `-${rowHeight - thumbnailWrapper.offsetHeight}px`;
  }
}

export { displayThumbnails, cascadeThumbnails };
