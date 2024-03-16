import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

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

  ngOnInit(): void {
    // TODO: Get list of past predictions

  }

  onPredictClick(): void {
    // TODO: Implement contacting API endpoint through an Angular service class
  }

  onCancelClick(): void {

  }

}
