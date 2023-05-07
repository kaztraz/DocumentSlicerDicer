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

export { loadLastOpenedFiles };
