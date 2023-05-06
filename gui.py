import tkinter as tk
from tkinter import filedialog
import pandas as pd
import os
from PIL import ImageTk, Image
from pdf_utils import generate_thumbnails

def add_pdf():
    file_path = filedialog.askopenfilename(filetypes=[("PDF files", "*.pdf")])
    if file_path:
        load_pdf(file_path)

def load_pdf(file_path):
    thumbnail_paths = generate_thumbnails(file_path, "thumbnails")
    
    for widget in thumbnail_frame.winfo_children():
        widget.destroy()

    for i, thumbnail_path in enumerate(thumbnail_paths):
        thumbnail_image = Image.open(thumbnail_path)
        thumbnail_photo = ImageTk.PhotoImage(thumbnail_image)
        thumbnail_label = ttk.Label(thumbnail_frame, image=thumbnail_photo)
        thumbnail_label.image = thumbnail_photo
        thumbnail_label.grid(row=i//4, column=i%4)

# Replace this line:
# thumbnail_frame.pack(fill="both", expand=True)
# with this line:
# thumbnail_frame.grid(row=1, column=0, sticky="nsew")

def correct_category():
    pass

def retrain_model():
    pass

root = tk.Tk()
root.title("PDF Page Classifier")

frame = tk.Frame(root)
frame.pack(padx=10, pady=10)

canvas = tk.Canvas(frame)
canvas.pack(padx=10, pady=10)

add_pdf_button = tk.Button(frame, text="Load PDF", command=add_pdf)
add_pdf_button.pack(side=tk.LEFT, padx=(0, 10))

correct_button = tk.Button(frame, text="Correct Category", command=correct_category)
correct_button.pack(side=tk.LEFT, padx=(0, 10))

retrain_button = tk.Button(frame, text="Retrain Model", command=retrain_model)
retrain_button.pack(side=tk.LEFT)

root.mainloop()
