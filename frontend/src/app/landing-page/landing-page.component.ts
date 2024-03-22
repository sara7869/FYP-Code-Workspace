import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

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

  // EmployeeCount should be initialized to 1

  myForm = this.formBuilder.group({
    Age: '',
    Attrition: '',
    BusinessTravel: '',
    DailyRate: '',
    Department: '',
    DistanceFromHome: '',
    Education: '',
    EducationField: '',
    EmployeeCount: '1',
    EmployeeNumber: '',
    EnvironmentSatisfaction: '',
    Gender: '',
    HourlyRate: '',
    JobInvolvement: '',
    JobLevel: '',
    JobRole: '',
    JobSatisfaction: '',
    MaritalStatus: '',
    MonthlyIncome: '',
    MonthlyRate: '',
    NumCompaniesWorked: '',
    Over18: '',
    OverTime: '',
    PercentSalaryHike: '',
    PerformanceRating: '',
    RelationshipSatisfaction: '',
    StandardHours: '',
    StockOptionLevel: '',
    TotalWorkingYears: '',
    TrainingTimesLastYear: '',
    WorkLifeBalance: '',
    YearsAtCompany: '',
    YearsInCurrentRole: '',
    YearsSinceLastPromotion: '',
    YearsWithCurrManager: ''


  });
  selectedJobRole: string = '';

  predictionsList: Array<string> = [
    'Prediction 1',
    'Prediction 2',
    'Prediction 3',
    'Prediction 4',
    'Prediction 5',
    'Prediction 6',
    'Prediction 7',
    'Prediction 8',
    'Prediction 9',
  ];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // TODO: Get list of past predictions
    console.log("Page initialized");
  }

  onCancelClick(): void {
    // Clear form fields
    this.myForm.reset();
  }

  // When job role is selected, set job level accordingly
  onJobRoleSelected(event: any): void {
    // select job level element and assign value
    this.selectedJobRole = event.target.value;
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
    console.log("Job level set to:", jobLevelMapping[this.selectedJobRole]);

  }

  onPredictClick(): void {
    // TODO: Implement contacting flask API endpoint through an Angular service class
    let myFormConverted = {
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
  
    console.log(myFormConverted);

    this.http.post('http://localhost:5000/predict', myFormConverted).subscribe((response) => {
      console.log(response);
    });

    // console log education  value
    console.log("Education value:", this.myForm.controls['Education'].value);
  }

}

