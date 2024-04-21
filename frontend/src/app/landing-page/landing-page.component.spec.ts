import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle predictionMade flag on predict click', () => {
    expect(component.predictionMade).toBeFalse();
    component.onPredictClick();
    expect(component.predictionMade).toBeTrue();
  });

  it('should mark the form as invalid if required fields are not filled out', () => {
    component.myForm.controls['PredictionName'].setValue('');
    component.myForm.controls['Age'].setValue('');
    component.myForm.controls['BusinessTravel'].setValue('');
    component.myForm.controls['DailyRate'].setValue('');
    component.myForm.controls['Department'].setValue('');
    component.myForm.controls['DistanceFromHome'].setValue('');
    component.myForm.controls['Education'].setValue('');
    component.myForm.controls['EducationField'].setValue('');
    // component.myForm.controls['EmployeeCount'].setValue('');
    // component.myForm.controls['EmployeeNumber'].setValue('');
    component.myForm.controls['EnvironmentSatisfaction'].setValue('');
    component.myForm.controls['Gender'].setValue('');
    component.myForm.controls['HourlyRate'].setValue('');
    component.myForm.controls['JobInvolvement'].setValue('');
    component.myForm.controls['JobRole'].setValue('');
    component.myForm.controls['JobLevel'].setValue('');
    component.myForm.controls['JobSatisfaction'].setValue('');
    component.myForm.controls['MaritalStatus'].setValue('');
    component.myForm.controls['MonthlyIncome'].setValue('');
    component.myForm.controls['MonthlyRate'].setValue('');
    component.myForm.controls['NumCompaniesWorked'].setValue('');
    // component.myForm.controls['Over18'].setValue('');
    component.myForm.controls['OverTime'].setValue('');
    component.myForm.controls['PercentSalaryHike'].setValue('');
    component.myForm.controls['PerformanceRating'].setValue('');
    component.myForm.controls['RelationshipSatisfaction'].setValue('');
    // component.myForm.controls['StandardHours'].setValue('');
    component.myForm.controls['StockOptionLevel'].setValue('');
    component.myForm.controls['TotalWorkingYears'].setValue('');
    component.myForm.controls['TrainingTimesLastYear'].setValue('');
    component.myForm.controls['WorkLifeBalance'].setValue('');
    component.myForm.controls['YearsAtCompany'].setValue('');
    component.myForm.controls['YearsInCurrentRole'].setValue('');
    component.myForm.controls['YearsSinceLastPromotion'].setValue('');
    component.myForm.controls['YearsWithCurrManager'].setValue('');

    expect(component.myForm.valid).toBeFalse();
  });

  it('should reset the form on cancel click', () => {
    component.myForm.controls['PredictionName'].setValue('Test Prediction');
    component.myForm.controls['Age'].setValue('30');
    component.myForm.controls['BusinessTravel'].setValue('Travel_Rarely');
    component.myForm.controls['DailyRate'].setValue('500');
    component.myForm.controls['Department'].setValue('Research & Development');
    component.myForm.controls['DistanceFromHome'].setValue('5');
    component.myForm.controls['Education'].setValue('1');
    component.myForm.controls['EducationField'].setValue('Life Sciences');
    // component.myForm.controls['EmployeeCount'].setValue('1');
    // component.myForm.controls['EmployeeNumber'].setValue('12345');
    component.myForm.controls['EnvironmentSatisfaction'].setValue('1');
    component.myForm.controls['Gender'].setValue('Male');
    component.myForm.controls['HourlyRate'].setValue('50');
    component.myForm.controls['JobInvolvement'].setValue('3');
    component.myForm.controls['JobRole'].setValue('Research Scientist');
    component.myForm.controls['JobLevel'].setValue('1');
    component.myForm.controls['JobSatisfaction'].setValue('2');
    component.myForm.controls['MaritalStatus'].setValue('Single');
    component.myForm.controls['MonthlyIncome'].setValue('3000');
    component.myForm.controls['MonthlyRate'].setValue('10000');
    component.myForm.controls['NumCompaniesWorked'].setValue('1');
    // component.myForm.controls['Over18'].setValue('Y');
    component.myForm.controls['OverTime'].setValue('No');
    component.myForm.controls['PercentSalaryHike'].setValue('15');
    component.myForm.controls['PerformanceRating'].setValue('3');
    component.myForm.controls['RelationshipSatisfaction'].setValue('3');
    // component.myForm.controls['StandardHours'].setValue('80');
    component.myForm.controls['StockOptionLevel'].setValue('0');
    component.myForm.controls['TotalWorkingYears'].setValue('1');
    component.myForm.controls['TrainingTimesLastYear'].setValue('1');
    component.myForm.controls['WorkLifeBalance'].setValue('3');
    component.myForm.controls['YearsAtCompany'].setValue('1');
    component.myForm.controls['YearsInCurrentRole'].setValue('1');
    component.myForm.controls['YearsSinceLastPromotion'].setValue('0');
    component.myForm.controls['YearsWithCurrManager'].setValue('0');
   
    component.onCancelClick();
   
    expect(component.myForm.value.PredictionName).toBeNull();
    expect(component.myForm.value.Age).toBeNull();
    expect(component.myForm.value.BusinessTravel).toBeNull();
    expect(component.myForm.value.DailyRate).toBeNull();
    expect(component.myForm.value.Department).toBeNull();
    expect(component.myForm.value.DistanceFromHome).toBeNull();
    expect(component.myForm.value.Education).toBeNull();
    expect(component.myForm.value.EducationField).toBeNull();
    // expect(component.myForm.value.EmployeeCount).toBeNull();
    // expect(component.myForm.value.EmployeeNumber).toBeNull();
    expect(component.myForm.value.EnvironmentSatisfaction).toBeNull();
    expect(component.myForm.value.Gender).toBeNull();
    expect(component.myForm.value.HourlyRate).toBeNull();
    expect(component.myForm.value.JobInvolvement).toBeNull();
    expect(component.myForm.value.JobRole).toBeNull();
    expect(component.myForm.value.JobLevel).toBeNull();
    expect(component.myForm.value.JobSatisfaction).toBeNull();
    expect(component.myForm.value.MaritalStatus).toBeNull();
    expect(component.myForm.value.MonthlyIncome).toBeNull();
    expect(component.myForm.value.MonthlyRate).toBeNull();
    expect(component.myForm.value.NumCompaniesWorked).toBeNull();
    // expect(component.myForm.value.Over18).toBeNull();
    expect(component.myForm.value.OverTime).toBeNull();
    expect(component.myForm.value.PercentSalaryHike).toBeNull();
    expect(component.myForm.value.PerformanceRating).toBeNull();
    expect(component.myForm.value.RelationshipSatisfaction).toBeNull();
    // expect(component.myForm.value.StandardHours).toBeNull();
    expect(component.myForm.value.StockOptionLevel).toBeNull();
    expect(component.myForm.value.TotalWorkingYears).toBeNull();
    expect(component.myForm.value.TrainingTimesLastYear).toBeNull();
    expect(component.myForm.value.WorkLifeBalance).toBeNull();
    expect(component.myForm.value.YearsAtCompany).toBeNull();
    expect(component.myForm.value.YearsInCurrentRole).toBeNull();
    expect(component.myForm.value.YearsSinceLastPromotion).toBeNull();
    expect(component.myForm.value.YearsWithCurrManager).toBeNull();
   });

});