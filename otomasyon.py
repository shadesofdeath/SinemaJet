import tkinter as tk
import json
from tkinter import messagebox
from tkinter import Label

def add_film():
    title = entry_title.get()
    format_ = entry_format.get()
    size = entry_size.get()
    quality = entry_quality.get()
    language = entry_language.get()
    download_link = entry_download_link.get()
    image_url = entry_image_url.get()
    categories = [category for i, category in enumerate(categories_list) if category_vars[i].get() == 1]

    film_data = {
        "title": title,
        "format": format_,
        "size": size,
        "quality": quality,
        "language": language,
        "downloadLink": download_link,
        "categories": categories,
        "imageUrl": image_url
    }

    # Load the existing data from the JSON file
    try:
        with open("films.json", "r", encoding="utf-8") as json_file:
            existing_data = json.load(json_file)
    except FileNotFoundError:
        existing_data = []

    # Check if the title already exists in the existing data
    if any(film["title"] == title for film in existing_data):
        messagebox.showwarning("Bacanak sakin ol :)", "Zaten film eklenmiş!")
        entry_title.delete(0, tk.END)
        entry_size.delete(0, tk.END)
        entry_download_link.delete(0, tk.END)
        entry_image_url.delete(0, tk.END)
        for var in category_vars:
            var.set(0)
        return

    # Append the new film data to the existing data
    existing_data.append(film_data)

    # Save the updated data back to the JSON file
    with open("films.json", "w", encoding="utf-8") as json_file:
        json.dump(existing_data, json_file, indent=2, ensure_ascii=False)

    # Clear entry fields and checkboxes
    entry_title.delete(0, tk.END)
    entry_size.delete(0, tk.END)
    entry_download_link.delete(0, tk.END)
    entry_image_url.delete(0, tk.END)
    for var in category_vars:
        var.set(0)

root = tk.Tk()
root.title("Film Ekleme Uygulaması")
root.geometry("600x400")  # Adjust width and height as needed

films = []

# Load the existing data from "films.json" only once when the program starts
try:
    with open("films.json", "r", encoding="utf-8") as json_file:
        films = json.load(json_file)
except FileNotFoundError:
    pass

categories_list = ["Aksiyon", "Aile", "Aksiyon", "Animasyon", "Belgesel", "Bilimkurgu", "Biyografi",
                   "Dram", "Fantastik", "Gerilim", "Gizem", "Komedi", "Korku", "Macera", "Müzik",
                   "Polisiye", "Reality", "Romantik", "Savas", "Spor", "Suç", "Tarih", "Western"]

category_vars = []
for category in categories_list:
    var = tk.IntVar()
    category_vars.append(var)

# Checkboxes (arranged in two columns)
for i, category in enumerate(categories_list):
    checkbox = tk.Checkbutton(root, text=category, variable=category_vars[i])
    checkbox.grid(row=i // 3, column=i % 3, sticky="w")

# Labels and Entry Fields (arranged in two columns)
tk.Label(root, text="Film Adı:", width=20).grid(row=len(categories_list) // 2 + 1, column=0, sticky="w")
entry_title = tk.Entry(root, width=30)
entry_title.grid(row=len(categories_list) // 2 + 1, column=1)

tk.Label(root, text="Format:", width=20).grid(row=len(categories_list) // 2 + 2, column=0, sticky="w")
entry_format = tk.Entry(root, width=30)
entry_format.grid(row=len(categories_list) // 2 + 2, column=1)

tk.Label(root, text="Boyut:", width=20).grid(row=len(categories_list) // 2 + 3, column=0, sticky="w")
entry_size = tk.Entry(root, width=30)
entry_size.grid(row=len(categories_list) // 2 + 3, column=1)

tk.Label(root, text="Kalite:", width=20).grid(row=len(categories_list) // 2 + 4, column=0, sticky="w")
entry_quality = tk.Entry(root, width=30)
entry_quality.grid(row=len(categories_list) // 2 + 4, column=1)

tk.Label(root, text="Dil:", width=20).grid(row=len(categories_list) // 2 + 5, column=0, sticky="w")
entry_language = tk.Entry(root, width=30)
entry_language.grid(row=len(categories_list) // 2 + 5, column=1)

tk.Label(root, text="İndirme Linki:", width=20).grid(row=len(categories_list) // 2 + 6, column=0, sticky="w")
entry_download_link = tk.Entry(root, width=30)
entry_download_link.grid(row=len(categories_list) // 2 + 6, column=1)

tk.Label(root, text="Kapak Resmi Linki:", width=20).grid(row=len(categories_list) // 2 + 7, column=0, sticky="w")
entry_image_url = tk.Entry(root, width=30)
entry_image_url.grid(row=len(categories_list) // 2 + 7, column=1)

add_button = tk.Button(root, text="Ekle", command=add_film, width=20)
add_button.grid(row=len(categories_list) // 2 + 8, columnspan=2)

root.mainloop()