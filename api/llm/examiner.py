import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.model_selection import GridSearchCV
import numpy as np

# Load data
df = pd.read_csv('dataset/ielts_writing_dataset.csv')

# Assume df is your dataframe containing the essays and their grades
X = df['Essay']
y = df['Overall']

# Vectorize the essays
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Train the model
X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)
trained_model = LinearRegression().fit(X_train, y_train)

def examine(user_data):
    # Preprocess the essay
    new_essay_vectorized = vectorizer.transform([user_data['Answer']])

    # Make a prediction
    predicted_grade = trained_model.predict(new_essay_vectorized)

    return predicted_grade[0]