from flask import Flask
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
from keras.models import load_model
from flask import Flask, request, jsonify
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.decomposition import TruncatedSVD
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import BaggingClassifier
import sqlite3
from datetime import datetime

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create a database connection
def get_db_connection():
    conn = sqlite3.connect('predictions.db') # Use the correct path to your database file
    conn.row_factory = sqlite3.Row # Optional: Enables dictionary-like access to columns
    return conn

# Create a table for prediction history
def init_db():
    with get_db_connection() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS prediction_history (
                id INTEGER PRIMARY KEY,
                prediction_name TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                input_data TEXT NOT NULL,
                prediction TEXT NOT NULL
            )
        ''')

# Initialize the database
init_db()


# Load the dataset
project_data = pd.read_csv("../dataset/Employee Analysis Attrition Report/HR Employee Attrition.csv")
X_train=project_data.drop(columns=["Attrition"])
y_train=project_data["Attrition"]
X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, test_size=0.3)

# Load Base Models
fnn_model = load_model("../fnn_model.h5")
wide_and_deep_model = load_model("../wide_and_deep_model.h5")
cnn_model = load_model("../cnn_model.h5")

# Load Stacking Ensemble Model
meta_model = load_model("../stacking_ensemble_model.h5")

numeric_columns = ['Age', 'DailyRate', 'DistanceFromHome', 'Education', 'EmployeeCount', 'EmployeeNumber', 'EnvironmentSatisfaction', 
                    'HourlyRate', 'JobInvolvement', 'JobLevel', 'JobSatisfaction', 'MonthlyIncome', 'MonthlyRate', 'NumCompaniesWorked', 
                    'PercentSalaryHike', 'PerformanceRating', 'RelationshipSatisfaction', 'StandardHours', 'StockOptionLevel', 
                    'TotalWorkingYears', 'TrainingTimesLastYear', 'WorkLifeBalance', 'YearsAtCompany', 'YearsInCurrentRole', 
                    'YearsSinceLastPromotion', 'YearsWithCurrManager']

categorical_columns = ['BusinessTravel', 'Department', 'EducationField', 'Gender', 'JobRole', 'MaritalStatus', 'Over18', 'OverTime']

# No. of columns in total - 35

numeric_features = Pipeline([
    ('handlingmissingvalues', SimpleImputer(strategy='median')),
    ('scaling', StandardScaler(with_mean=True))
])

categorical_features = Pipeline([
    ('handlingmissingvalues', SimpleImputer(strategy='most_frequent')),
    ('encoding', OneHotEncoder()),
    ('scaling', StandardScaler(with_mean=False))
])

processing = ColumnTransformer([
    ('numeric', numeric_features, numeric_columns),
    ('categorical', categorical_features, categorical_columns)
])


def prepare_model(model_name, model):
    model = Pipeline(steps= [
        ('processing',processing),
        ('pca', TruncatedSVD(n_components=3, random_state=12)),
        (model_name, model)
    ])
    model.fit(X_train, y_train)
    return model

# Initialize prediction name variable
prediction_name = ""

@app.route('/predict', methods=['POST'])
@cross_origin()
def makePredictions():

    form_data = request.json
    
    # Remove the prediction name field and assign to a variable
    global prediction_name 
    prediction_name = form_data.pop('PredictionName', None)
    print("Prediction Name:", prediction_name)
    
    # print("Form Data:", form_data)
    
    df = pd.DataFrame(form_data, index=[0])
    processing.fit(X_train)
    
    algorithms = [('bagging classifier', BaggingClassifier()), 
              ('MLP', MLPClassifier())
             ]

    for index, tup in enumerate(algorithms):
        model = prepare_model(tup[0],tup[1])
        
    print("df:", df)
        
    # Preprocess the form data
    X_form_transformed = model.named_steps['processing'].transform(df)
    X_form_svd = model.named_steps['pca'].transform(X_form_transformed)
    
    X_form_reshaped = np.expand_dims(X_form_svd, axis=2)
    
    wd_input_data = [X_form_svd, X_form_svd]

    # Make a prediction using the base models
    prediction_fnn = fnn_model.predict(X_form_svd)
    prediction_wide_and_deep = wide_and_deep_model.predict(wd_input_data)
    prediction_cnn = cnn_model.predict(X_form_reshaped)

    # Make a prediction using the stacking ensemble model
    predictions = [prediction_fnn, prediction_wide_and_deep, prediction_cnn]
    meta_X = np.concatenate(predictions, axis=1)
    prediction_stacking = meta_model.predict(meta_X)
    
    # Simple Averaging
    # 0 means the employee will not leave the company and 1 means the employee will leave the company
    # simple_average_prediction = np.round(np.mean(predictions, axis=0)).astype(int)
    simple_average_prediction = np.mean(predictions, axis=0)

    # Voting
    # class_votes = np.round(np.mean(predictions, axis=0)).astype(int)
    # voting_prediction = np.where(np.sum(class_votes, axis=1) > predictions_array.shape[0] / 2, 1, 0)
    
    class_votes = np.mean(predictions, axis=0)
    voting_prediction = class_votes
    
    # Converting all predictions to Yes, No based on the threshold of 0.5
    # Yes - Employee will leave the company
    # No - Employee will not leave the company
    binary_predictions = [
        "FNN: Yes" if prediction_fnn[0] > 0.5 else "FNN: No",
        "Wide and Deep : Yes" if prediction_wide_and_deep[0] > 0.5 else "Wide and Deep: No",
        "CNN: Yes" if prediction_cnn[0] > 0.5 else "CNN: No",
        "Stacking: Yes" if prediction_stacking[0] > 0.5 else "Stacking: No",
        "Simple Average: Yes" if simple_average_prediction[0] > 0.5 else "Simple Average: No",
        "Voting: Yes" if voting_prediction[0] > 0.5 else "Voting: No"
    ]
    
    final_predictions = [
        "FNN: ", prediction_fnn[0],
        "Wide and Deep: ", prediction_wide_and_deep[0],
        "CNN: ", prediction_cnn[0],
        "Stacking: ", prediction_stacking[0],
        "Simple Average: ", simple_average_prediction[0],
        "Voting: ", voting_prediction[0]
    ]
    
    # convert float to string
    fnn_strified = str(prediction_fnn[0])
    
    # final predictions with predictions with just the float value as string
    
    final_predictions = [
        str(prediction_fnn[0][0]),
        str(prediction_wide_and_deep[0][0]),
        str(prediction_cnn[0][0]),
        str(prediction_stacking[0][0]),
        str(simple_average_prediction[0][0]),
        str(voting_prediction[0][0])
    ]
    
    # final_predictions = jsonify(final_predictions)
    
    print("Predictions:")
    print("FNN:", prediction_fnn[0])
    print("Wide and Deep:", prediction_wide_and_deep[0])
    print("CNN:", prediction_cnn[0])
    
    print("Stacking:", prediction_stacking[0])
    print("Simple Average:", simple_average_prediction[0])
    print("Voting:", voting_prediction[0])
    
    
    
    save_prediction_history(prediction_name, form_data, binary_predictions)

    # Fix TypeError: Object of type ndarray is not JSON serializable at return statement
    
    # final_predictions_list = final_predictions.tolist()


    # Return final predictions 
    return {
        "predictions": final_predictions
    }

# Function to save the prediction history
def save_prediction_history(prediction_name, input_data, predictions):
    with get_db_connection() as conn:
        
        current_timestamp = datetime.now().isoformat()
        combined_predictions = ', '.join(predictions)

        conn.execute('''
            INSERT INTO prediction_history (prediction_name, timestamp, input_data, prediction)
            VALUES (?, ?, ?, ?)
        ''', (prediction_name, current_timestamp, str(input_data), str(combined_predictions)))
        conn.commit()
        
@app.route('/recent_predictions', methods=['GET'])
def get_recent_predictions():
    with get_db_connection() as conn:
        cursor = conn.execute('''
            SELECT * FROM prediction_history
            ORDER BY timestamp DESC
            LIMIT 10
        ''')
        recent_predictions = cursor.fetchall()

    # Convert the records to a list of dictionaries for JSON serialization
    recent_predictions_list = [dict(row) for row in recent_predictions]
    print(recent_predictions_list)
    return jsonify(recent_predictions_list)

# Function to test the database
def test_db():
    # Insert a test record
    test_name = "Test prediction name"
    test_input_data = "Test input data"
    test_prediction = "Test prediction"
    save_prediction_history(test_name, test_input_data, test_prediction)

    # Query the test record
    with get_db_connection() as conn:
        cursor = conn.execute('''
            SELECT * FROM prediction_history WHERE input_data = ? AND prediction = ?
        ''', (test_input_data, test_prediction))
        record = cursor.fetchone()

    # Check if the test record was found
    if record:
        print("Database is working properly.")
        print("Test record:", record)
    else:
        print("Database test failed.")

# Run the database test
# test_db()

if __name__ == '__main__':
    app.run(debug=True)

