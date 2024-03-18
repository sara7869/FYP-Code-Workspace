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

  // Fields -	YearsWithCurrManager
  myForm = this.formBuilder.group({
    age: '',
    business_travel: '',
    daily_rate: '',
    department: '',
    distance_from_home: '',
    education: '',
    education_field: '',
    employee_count: '1',
    employee_number: '',
    environment_satisfaction: '',
    gender: '',
    hourly_rate: '',
    job_involvement: '',
    job_level: '',
    job_role: '',
    job_satisfaction: '',
    marital_status: '',
    monthly_income: '',
    monthly_rate: '',
    num_companies_worked: '',
    over_18: '',
    over_time: '',
    percent_salary_hike: '',
    performance_rating: '',
    relationship_satisfaction: '',
    standard_hours: '',
    stock_option_level: '',
    total_working_years: '',
    training_times_last_year: '',
    work_life_balance: '',
    years_at_company: '',
    years_in_current_role: '',
    years_since_last_promotion: '',
    years_with_curr_manager: ''
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

  onPredictClick(): void {
    // TODO: Implement contacting flask API endpoint through an Angular service class
    this.myForm.controls['employee_count'].setValue('1');
    console.log(this.myForm.value);
    this.http.post('http://localhost:5000/predict', this.myForm.value).subscribe((data: any) => {
      console.log(data);
      this.predictionsList = data.predictions;
    });
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
    this.myForm.controls['job_level'].setValue(String(jobLevelMapping[this.selectedJobRole]));
    console.log("Job level set to:", jobLevelMapping[this.selectedJobRole]);

  }

}

