async function uploadPdf(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const fileInput = form.querySelector('input[name="pdf_file"]');
  const file = fileInput.files[0];

  
  formData.append('pdf_file', file);
  const response = await fetch('/upload_pdf', {
    method: 'POST',
    body: formData,
  });
  const lastOpenedFilesInput = document.getElementById("lastOpenedFiles");
  let lastOpenedFiles = lastOpenedFilesInput.value ? JSON.parse(lastOpenedFilesInput.value) : [];

  lastOpenedFiles.push(file.name);
  if (lastOpenedFiles.length > 2) {
    lastOpenedFiles.shift(); // Remove the oldest file
  }

  lastOpenedFilesInput.value = JSON.stringify(lastOpenedFiles);
  const jsonResponse = await response.json();
  displayThumbnails(jsonResponse.thumbnail_paths);
  form.reset();
}

const pdfInput = document.querySelector('input[name="pdf_file"]');
pdfInput.addEventListener('change', () => {
  const form = pdfInput.closest('form');
  form.submit();
});



function displayThumbnails(thumbnailPaths) {
  const thumbnailContainer = document.getElementById('thumbnails');
  thumbnailContainer.innerHTML = '';
  let previousThumbnail = null;

  for (const thumbnailPath of thumbnailPaths) {
    const img = document.createElement('img');
    img.src = thumbnailPath;
    img.className = 'thumbnail';
    thumbnailContainer.appendChild(img);

    if (previousThumbnail) {
      if (img.offsetTop === previousThumbnail.offsetTop) {
        img.style.left = `${previousThumbnail.offsetLeft + previousThumbnail.offsetWidth}px`;
      }
    }

    previousThumbnail = img;
  }

  cascadeThumbnails();
}

function adjustZoom() {
  const zoomSlider = document.getElementById("zoom");
  const zoomValue = zoomSlider.value;
  const thumbnails = document.getElementsByClassName("thumbnail");

  for (let thumbnail of thumbnails) {
    thumbnail.style.maxWidth = `${zoomValue}px`;
    thumbnail.style.maxHeight = `${zoomValue * 1.5}px`;
  }

  cascadeThumbnails();
}

function loadLastOpenedFiles() {
  const lastOpenedFilesInput = document.getElementById("lastOpenedFiles");
  const lastOpenedFiles = lastOpenedFilesInput.value ? JSON.parse(lastOpenedFilesInput.value) : [];

  // Check if lastOpenedFiles is an array before using it in a for..of loop
  if (Array.isArray(lastOpenedFiles)) {
    for (const file of lastOpenedFiles) {
      console.log("Load file:", file);
      // Load the file using the folder tree view library
    }
  }
}


// Load the last opened files when the application starts
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

function cascadeThumbnails() {
  const thumbnails = document.getElementsByClassName('thumbnail');

  for (let i = 1; i < thumbnails.length; i++) {
    const thumbnail = thumbnails[i];
    const prevThumbnail = thumbnails[i - 1];

    if (thumbnail.offsetTop - prevThumbnail.offsetTop < prevThumbnail.clientHeight) {
      thumbnail.style.top = `${prevThumbnail.offsetTop + prevThumbnail.clientHeight}px`;
    }
  }
}

// Get the drop zone element
const dropZone = document.getElementById('drop-zone');

// Add event listeners for drag events
dropZone.addEventListener('dragenter', handleDragEnter);
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleDrop);

// Add a drop event listener to the document
document.addEventListener('drop', async (event) => {
  // Prevent the default behavior of opening the file in the browser
  event.preventDefault();

  // Check if the dropped item is a file
  if (event.dataTransfer.items && event.dataTransfer.items.length > 0 && event.dataTransfer.items[0].kind === 'file') {
    const file = event.dataTransfer.items[0].getAsFile();

    // Create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('pdf_file', file);

    // Send a POST request to the server to upload the file
    const response = await fetch('/upload_pdf', {
      method: 'POST',
      body: formData,
    });

    // Parse the response as JSON and display the thumbnails
    const jsonResponse = await response.json();
    displayThumbnails(jsonResponse.thumbnail_paths);

    // Add the file to the "last opened files" list
    const lastOpenedFilesInput = document.getElementById('lastOpenedFiles');
    let lastOpenedFiles = lastOpenedFilesInput.value ? JSON.parse(lastOpenedFilesInput.value) : [];
    lastOpenedFiles.push(file.name);
    if (lastOpenedFiles.length > 2) {
      lastOpenedFiles.shift(); // Remove the oldest file
    }
    lastOpenedFilesInput.value = JSON.stringify(lastOpenedFiles);
  }
});

// Add a dragover event listener to the document
document.addEventListener('dragover', (event) => {
  // Prevent the default behavior of opening the file in the browser
  event.preventDefault();
});
