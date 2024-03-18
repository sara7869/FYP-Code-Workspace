# The code snippet for converting the job role value from the frontend form to a numerical value to get job level value will be done in line 15-17

from flask import Flask
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
from flask import Flask, request

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load models
ensemble_model_stacking = pickle.load(open('../ensemble_model_stacking.pkl', 'rb'))
ensemble_model_voting = pickle.load(open('../ensemble_model_voting.pkl', 'rb'))
ensemble_model_simple_average = pickle.load(open('../ensemble_model_simple_average.pkl', 'rb'))


# Implement the backend API for predictions using all 3 models using form data from angular 
# frontend
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    # Get the form data from the frontend
    form_data = request.get_json()
    print(form_data)
    # Predict using the 3 models
    prediction_stacking = ensemble_model_stacking.predict(form_data)
    prediction_voting = ensemble_model_voting.predict(form_data)
    prediction_simple_average = ensemble_model_simple_average.predict(form_data)
    # Return the predictions to the frontend
    return {
        "prediction_stacking": prediction_stacking,
        "prediction_voting": prediction_voting,
        "prediction_simple_average": prediction_simple_average
    }
    # return form_data

if __name__ == '__main__':
    app.run(debug=True)

