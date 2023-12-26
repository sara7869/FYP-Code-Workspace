from flask import Flask
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.decomposition import TruncatedSVD
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline


# libraries for models
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import AdaBoostClassifier, BaggingClassifier, GradientBoostingClassifier, RandomForestClassifier

app = Flask(__name__)

# Load model
model = pickle.load(open('../Employee Analysis Attrition Report - Random Forest calssifier.pkl', 'rb'))

# Input data
input_data = {
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

input_data_df = pd.DataFrame(input_data)

# for index, tup in enumerate(algorithms):
    # name = tup[0]
    # algorithm = tup[1]
    # model = predict(tup[0],tup[1])
    # model_and_score[tup[0]] = str(model.score(X_train,y_train)*100)+"%"
    # trained_models.append((tup[0],model))

@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"

@app.route("/predict")
def predict():

    # print(name+' Report :')
#     pred = model.predict(X_test)
    pred_testrow = model.predict(input_data_df)
#     print(classification_report(y_test, pred))
    # print("My row prediction: ", pred_testrow)
    
    # Convert the NumPy array to a string
    prediction_str = str(pred_testrow)

    line: str = "<p>"+" Report: " + "My row prediction: " + prediction_str + "</p>"

    return line

if __name__ == "__main__":
    app.run(debug=True)