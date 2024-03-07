from flask import Flask
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

app = Flask(__name__)

# Load models
ensemble_model_stacking = pickle.load(open('../ensemble_model_stacking.pkl', 'rb'))
ensemble_model_voting = pickle.load(open('../ensemble_model_voting.pkl', 'rb'))
ensemble_model_simple_average = pickle.load(open('../ensemble_model_simple_average.pkl', 'rb'))

# Input data
# Row 1100 - No
input_data1 = {
    "Age": [40],
    "BusinessTravel": ['Non-Travel'],
    "DailyRate": [1142],
    "Department": ['Research & Development'],
    "DistanceFromHome": [8],
    "Education": [2],
    "EducationField": ['Life Sciences'],
    "EmployeeCount": [1],
    "EmployeeNumber": [1552],
    "EnvironmentSatisfaction": [4],
    "Gender": ['Male'],
    "HourlyRate": [72],
    "JobInvolvement": [3],
    "JobLevel": [2],
    "JobRole": ['Healthcare Representative'],
    "JobSatisfaction": [4],
    "MaritalStatus": ['Divorced'],
    "MonthlyIncome": [4069],
    "MonthlyRate": [8841],
    "NumCompaniesWorked": [3],
    "Over18": ['Y'],
    "OverTime": ['Yes'],
    "PercentSalaryHike": [18],
    "PerformanceRating": [3],
    "RelationshipSatisfaction": [3],
    "StandardHours": [80],
    "StockOptionLevel": [0],
    "TotalWorkingYears": [8],
    "TrainingTimesLastYear": [2],
    "WorkLifeBalance": [3],
    "YearsAtCompany": [2],
    "YearsInCurrentRole": [2],
    "YearsSinceLastPromotion": [2],
    "YearsWithCurrManager": [2]
}

# Row 999 - Yes
input_data2 = {
    "Age": [27],
    "BusinessTravel": ['Travel_Rarely'],
    "DailyRate": [135],
    "Department": ['Research & Development'],
    "DistanceFromHome": [17],
    "Education": [4],
    "EducationField": ['Life Sciences'],
    "EmployeeCount": [1],
    "EmployeeNumber": [1405],
    "EnvironmentSatisfaction": [4],
    "Gender": ['Female'],
    "HourlyRate": [51],
    "JobInvolvement": [3],
    "JobLevel": [2],
    "JobRole": ['Research Scientist'],
    "JobSatisfaction": [3],
    "MaritalStatus": ['Single'],
    "MonthlyIncome": [2394],
    "MonthlyRate": [25681],
    "NumCompaniesWorked": [1],
    "Over18": ['Y'],
    "OverTime": ['Yes'],
    "PercentSalaryHike": [13],
    "PerformanceRating": [3],
    "RelationshipSatisfaction": [4],
    "StandardHours": [80],
    "StockOptionLevel": [0],
    "TotalWorkingYears": [8],
    "TrainingTimesLastYear": [2],
    "WorkLifeBalance": [3],
    "YearsAtCompany": [8],
    "YearsInCurrentRole": [2],
    "YearsSinceLastPromotion": [7],
    "YearsWithCurrManager": [7]
}

input_data_df1 = pd.DataFrame(input_data1)
input_data_df2 = pd.DataFrame(input_data2)

def predict(model):
    
    pred_testrow1 = model.predict(input_data_df1)
    pred_testrow2 = model.predict(input_data_df2)
    
    # Convert the NumPy array to a string
    prediction_str1 = str(pred_testrow1)
    prediction_str2 = str(pred_testrow2)

    line: str = "<p>"+ "My 1st row prediction: Attrition: " + prediction_str1 +  "</p><p> My 2nd row prediction: Attrition: " + prediction_str2 + "</p>"

    return line

@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"

@app.route("/predict/ensemble-model-stacking") 
def ensembleModelStacking():
    # line = predict(ensemble_model_stacking)
    line = "Test line for ensemble_model_stacking"
    return line

@app.route("/predict/ensemble-model-voting")
def ensembleModelVoting():
    line = predict(ensemble_model_voting)
    return line

@app.route("/predict/ensemble-model-simple-average")
def ensembleModelSimpleAverage():
    line = predict(ensemble_model_simple_average)
    return line

if __name__ == '__main__':
    app.run(debug=True)