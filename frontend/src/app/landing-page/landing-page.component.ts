import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, CategoryScale, Title, Tooltip, Legend, LinearScale } from 'chart.js';
import { registerables } from 'chart.js';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})

export class LandingPageComponent implements OnInit {

  showPredictionResults = false;
  selectedEnsembleTechnique: string = 'Stacking'; // Default value

  myForm = this.formBuilder.group({
    // PredictionName: new FormControl('', Validators.required),
    // Age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)]),
    // BusinessTravel: new FormControl('', Validators.required),
    // DailyRate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000)]),
    // Department: new FormControl('', Validators.required),
    // DistanceFromHome: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // Education: new FormControl('', Validators.required),
    // EducationField: new FormControl('', Validators.required),
    // EmployeeCount: new FormControl('1'),
    // EmployeeNumber: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000)]),
    // EnvironmentSatisfaction: new FormControl('', Validators.required),
    // Gender: new FormControl('', Validators.required),
    // HourlyRate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // JobInvolvement: new FormControl('', Validators.required),
    // JobRole: new FormControl('', Validators.required),
    // JobLevel: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    // JobSatisfaction: new FormControl('', Validators.required),
    // MaritalStatus: new FormControl('', Validators.required),
    // MonthlyIncome: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000)]),
    // MonthlyRate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000)]),
    // NumCompaniesWorked: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // Over18: new FormControl('', Validators.required),
    // OverTime: new FormControl('', Validators.required),
    // PercentSalaryHike: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // PerformanceRating: new FormControl('', Validators.required),
    // RelationshipSatisfaction: new FormControl('', Validators.required),
    // StandardHours: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // StockOptionLevel: new FormControl('', Validators.required),
    // TotalWorkingYears: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // TrainingTimesLastYear: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // WorkLifeBalance: new FormControl('', Validators.required),
    // YearsAtCompany: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // YearsInCurrentRole: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // YearsSinceLastPromotion: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    // YearsWithCurrManager: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])

    // For easy testing, we can pre-populate the form with some values
    PredictionName: 'Test Prediction',
    Age: '25',
    BusinessTravel: 'Travel_Rarely',
    DailyRate: '500',
    Department: 'Research & Development',
    DistanceFromHome: '5',
    Education: '1',
    EducationField: 'Life Sciences',
    EmployeeCount: '1',
    EmployeeNumber: '1',
    EnvironmentSatisfaction: '2',
    Gender: 'Male',
    HourlyRate: '50',
    JobInvolvement: '3',
    JobLevel: '1',
    JobRole: 'Research Scientist',
    JobSatisfaction: '2',
    MaritalStatus: 'Single',
    MonthlyIncome: '3000',
    MonthlyRate: '10000',
    NumCompaniesWorked: '1',
    Over18: 'Y',
    OverTime: 'No',
    PercentSalaryHike: '15',
    PerformanceRating: '3',
    RelationshipSatisfaction: '3',
    StandardHours: '8',
    StockOptionLevel: '0',
    TotalWorkingYears: '1',
    TrainingTimesLastYear: '1',
    WorkLifeBalance: '3',
    YearsAtCompany: '1',
    YearsInCurrentRole: '1',
    YearsSinceLastPromotion: '0',
    YearsWithCurrManager: '0'

  });

  selectedJobRole: string = '';

  predictionsList: { prediction_name: string; timestamp: string; input_data: any; prediction_result: any }[] = [];

  finalPredictions: any = {};


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    const url = 'http://localhost:5000/recent_predictions';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the data from the response
        this.predictionsList = data.map((prediction: { prediction_name: string; timestamp: string; input_data: any; prediction_result: any }) => {
          return {
            prediction_name: prediction.prediction_name,
            timestamp: new Date(prediction.timestamp).toLocaleString(),
            input_data: prediction.input_data,
            prediction_result: prediction.prediction_result
          };
        });
      })
      .catch(error => {
        console.error('Error fetching recent predictions:', error);
      });

  }

  ngOnInit(): void {
    // TODO: Get list of past predictions
    console.log("Page initialized");
    Chart.register(
      PieController,
      ArcElement,
      CategoryScale,
      Title,
      Tooltip,
      Legend,
      LinearScale
    );

  }

  onCancelClick(): void {
    // Clear form fields
    this.myForm.reset();
  }

  // When job role is selected, set job level accordingly
  onJobRoleSelected(event: Event): void {
    // select job level element and assign value
    const selectElement = event.target as HTMLSelectElement;
    this.selectedJobRole = selectElement.value;
    console.log("Selected job role:", this.selectedJobRole);

    // Define a mapping of job roles to job levels
    const jobLevelMapping: { [key: string]: number } = {
      "Sales Representative": 1,
      "Laboratory Technician": 1,
      "Human Resources": 1,
      "Research Scientist": 1,
      "Healthcare Representative": 2,
      "Sales Executive": 2,
      "Manager": 3,
      "Research Director": 3,
      "Manufacturing Director": 4,
      "Executive Director": 5,
      "Director": 5
    };

    // Set the job level based on the selected job role
    // Use a type assertion to tell TypeScript that jobLevelMapping[this.selectedJobRole] is a number
    this.myForm.controls['JobLevel'].setValue(String(jobLevelMapping[this.selectedJobRole]));
    // console.log("Job level set to:", jobLevelMapping[this.selectedJobRole]);

  }

  onPredictClick(): void {
    // Check if form is valid
    // if (!this.myForm.valid) {
    //   console.log("Form is invalid");
    //   return;
    // }
    // TODO: Implement contacting flask API endpoint through an Angular service class
    const myFormConverted = {
      PredictionName: this.myForm.value.PredictionName,
      Age: Number(this.myForm.value.Age),
      BusinessTravel: this.myForm.value.BusinessTravel,
      DailyRate: Number(this.myForm.value.DailyRate),
      Department: this.myForm.value.Department,
      DistanceFromHome: Number(this.myForm.value.DistanceFromHome),
      Education: Number(this.myForm.value.Education),
      EducationField: this.myForm.value.EducationField,
      EmployeeCount: Number(this.myForm.value.EmployeeCount),
      EmployeeNumber: Number(this.myForm.value.EmployeeNumber),
      EnvironmentSatisfaction: Number(this.myForm.value.EnvironmentSatisfaction),
      Gender: this.myForm.value.Gender,
      HourlyRate: Number(this.myForm.value.HourlyRate),
      JobInvolvement: Number(this.myForm.value.JobInvolvement),
      JobLevel: Number(this.myForm.value.JobLevel),
      JobRole: this.myForm.value.JobRole,
      JobSatisfaction: Number(this.myForm.value.JobSatisfaction),
      MaritalStatus: this.myForm.value.MaritalStatus,
      MonthlyIncome: Number(this.myForm.value.MonthlyIncome),
      MonthlyRate: Number(this.myForm.value.MonthlyRate),
      NumCompaniesWorked: Number(this.myForm.value.NumCompaniesWorked),
      Over18: this.myForm.value.Over18,
      OverTime: this.myForm.value.OverTime,
      PercentSalaryHike: Number(this.myForm.value.PercentSalaryHike),
      PerformanceRating: Number(this.myForm.value.PerformanceRating),
      RelationshipSatisfaction: Number(this.myForm.value.RelationshipSatisfaction),
      StandardHours: Number(this.myForm.value.StandardHours),
      StockOptionLevel: Number(this.myForm.value.StockOptionLevel),
      TotalWorkingYears: Number(this.myForm.value.TotalWorkingYears),
      TrainingTimesLastYear: Number(this.myForm.value.TrainingTimesLastYear),
      WorkLifeBalance: Number(this.myForm.value.WorkLifeBalance),
      YearsAtCompany: Number(this.myForm.value.YearsAtCompany),
      YearsInCurrentRole: Number(this.myForm.value.YearsInCurrentRole),
      YearsSinceLastPromotion: Number(this.myForm.value.YearsSinceLastPromotion),
      YearsWithCurrManager: Number(this.myForm.value.YearsWithCurrManager)
    };

    console.log("myformConverted: ", myFormConverted);

    this.http.post('http://localhost:5000/predict', myFormConverted).subscribe((data: any ) => {
      this.finalPredictions = data.predictions;
      console.log(this.finalPredictions);
      this.initializeCharts(this.finalPredictions);
    });

    this.togglePredictionResults();

    // initializeCharts has to happen after the prediction results are available


  }

  initializeCharts(predictions: number[]) {
    const ctxFnn = document.getElementById('fnnChart');
    const ctxWideAndDeep = document.getElementById('wideAndDeepChart');
    const ctxCnn = document.getElementById('cnnChart');
    const ctxEnsemble = document.getElementById('ensembleChart');

    // Assuming you have the prediction results in this.finalPredictions
    const fnnPrediction = predictions[0];
    const wideAndDeepPrediction = predictions[1];
    const cnnPrediction = predictions[2];
    const ensemblePrediction = predictions[3];

    console.log(predictions)

    console.log('fnnPrediction:', fnnPrediction);
    console.log('wideAndDeepPrediction:', wideAndDeepPrediction);
    console.log('cnnPrediction:', cnnPrediction);
    console.log('ensemblePrediction:', ensemblePrediction);

    // Create the pie charts
    this.createPieChart(ctxFnn, fnnPrediction);
    this.createPieChart(ctxWideAndDeep, wideAndDeepPrediction);
    this.createPieChart(ctxCnn, cnnPrediction);
    this.createPieChart(ctxEnsemble, ensemblePrediction);
  }

  createPieChart(ctx: HTMLElement | null, prediction: number) {
    if (!ctx) {
      return; // Return early if ctx is null
    }
    else {
      new Chart(ctx as HTMLCanvasElement, {
        type: 'pie',
        data: {
          labels: ['No', 'Yes'],
          datasets: [{
            label: 'Prediction',
            data: [1 - prediction, prediction],
            backgroundColor: [
              // green, black
              'rgba(75,192,192,1)',
              'rgba(0,0,0,1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // scales: {
          //   y: {
          //     beginAtZero: true
          //   }
          // }
        }
      });
    }

  }

  togglePredictionResults() {
    this.showPredictionResults = this.showPredictionResults = true;
  }

  onEnsembleTechniqueChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedEnsembleTechnique = selectElement.value;
    // You can add additional logic here if needed
    console.log(this.finalPredictions);
    // create pie chart for the selected ensemble technique
    switch (this.selectedEnsembleTechnique) {
      case 'Stacking':
        this.createPieChart(document.getElementById('ensembleChart'), this.finalPredictions[3]);
        break;
      case 'Voting':
        this.createPieChart(document.getElementById('ensembleChart'), this.finalPredictions[4]);
        break;
      case 'Simple Average':
        this.createPieChart(document.getElementById('ensembleChart'), this.finalPredictions[5]);
        break;
    }
  }
}