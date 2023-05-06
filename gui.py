import tkinter as tk
from tkinter import filedialog
import pandas as pd
import os

def add_file():
    file_path = filedialog.askopenfilename()
    if file_path:
        files_list.insert(tk.END, file_path)

def remove_file():
    selected_file = files_list.curselection()
    if selected_file:
        files_list.delete(selected_file)

def train_model():
    file_paths = files_list.get(0, tk.END)
    if not file_paths:
        return

    if not os.path.exists("temp_dataset"):
        os.makedirs("temp_dataset")

    # Combine all files and create a temporary dataset
    combined_data = []
    for file_path in file_paths:
        data = pd.read_csv(file_path)
        combined_data.append(data)

    combined_dataset = pd.concat(combined_data, ignore_index=True)
    combined_dataset.to_csv("temp_dataset/dataset.csv", index=False)

    # Train the model using the temporary dataset
    os.system("python train_model.py")
    
    # Clean up
    os.remove("temp_dataset/dataset.csv")
    os.rmdir("temp_dataset")

root = tk.Tk()
root.title("PDF Page Classifier")

frame = tk.Frame(root)
frame.pack(padx=10, pady=10)

files_list = tk.Listbox(frame, width=80, height=10)
files_list.pack(pady=10)

add_button = tk.Button(frame, text="Add File", command=add_file)
add_button.pack(side=tk.LEFT, padx=(0, 10))

remove_button = tk.Button(frame, text="Remove File", command=remove_file)
remove_button.pack(side=tk.LEFT, padx=(0, 10))

train_button = tk.Button(frame, text="Train Model", command=train_model)
train_button.pack(side=tk.LEFT)

root.mainloop()
