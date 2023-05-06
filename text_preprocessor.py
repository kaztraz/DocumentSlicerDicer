import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    stemmer = PorterStemmer()
    tokens = word_tokenize(text)
    tokens = [token.lower() for token in tokens if token.isalnum()]
    tokens = [stemmer.stem(token) for token in tokens if token not in stop_words]
    return tokens

if __name__ == "__main__":
    sample_text = "This is a sample text to demonstrate text preprocessing."
    print(preprocess_text(sample_text))
