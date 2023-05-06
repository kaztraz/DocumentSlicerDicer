import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline
import joblib

from pdf_text_extractor import extract_pdf_text_by_page
from text_preprocessor import preprocess_text

# Read the dataset
data = pd.read_csv('dataset.csv')

# Extract text and preprocess
texts = []
for index, row in data.iterrows():
    text = extract_pdf_text_by_page(row['filename'], row['page'])
    tokens = preprocess_text(text)
    texts.append(" ".join(tokens))

data['text'] = texts

# Create a pipeline for feature extraction and model training
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(data['text'], data['category'], test_size=0.3, random_state=42)

# Train the model
pipeline.fit(X_train, y_train)

# Evaluate the model
predictions = pipeline.predict(X_test)
print(classification_report(y_test, predictions))

# Save the model
joblib.dump(pipeline, 'model.pkl')
