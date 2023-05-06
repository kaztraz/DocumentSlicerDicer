from pdf2image import convert_from_path
import os

def generate_thumbnails(pdf_file, output_folder):
    poppler_path = r"C:\poppler\Library\bin"
    images = convert_from_path(pdf_file, dpi=100, poppler_path=poppler_path)

    if not os.path.exists(output_folder):
            os.makedirs(output_folder)

    for i, image in enumerate(images):
        thumbnail_path = os.path.join(output_folder, f"thumbnail_{i+1}.png")
        image.save(thumbnail_path, "PNG")

    return [os.path.join(output_folder, f"thumbnail_{i+1}.png") for i in range(len(images))]
