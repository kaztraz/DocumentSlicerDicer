from flask import Flask, render_template, request
from pdf_utils import generate_thumbnails
import os
import tempfile
from werkzeug.utils import secure_filename
from flask import jsonify

app = Flask(__name__)

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Upload PDF route
@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    pdf_file = request.files['pdf_file']
    output_folder = 'static/thumbnails'

    # Save the file temporarily
    temp_pdf_path = os.path.join(tempfile.gettempdir(), secure_filename(pdf_file.filename))
    pdf_file.save(temp_pdf_path)

    # Generate the thumbnails
    thumbnail_paths = generate_thumbnails(temp_pdf_path, output_folder)

    # Remove the temporary file
    os.remove(temp_pdf_path)

    # Send the thumbnail paths as JSON
    return jsonify(thumbnail_paths=thumbnail_paths)



if __name__ == '__main__':
    app.run(debug=True)
