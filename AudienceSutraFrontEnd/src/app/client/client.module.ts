import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { ActiveSurveyComponent } from './active-survey/active-survey.component';
import { VisualizationDashboardComponent } from './visualization-dashboard/visualization-dashboard.component';
import { HighchartMapModule } from '../highchart-map/highchart-map.module';
import { PiechartModule } from '../piechart/piechart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDetailsComponent } from './my-details/my-details.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentComponent } from './payment/payment.component';
import { SafePipe } from '../safe.pipe';

export const appRouts: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'visual/dashboard', component: VisualizationDashboardComponent, pathMatch: 'full' },
  { path: 'active', component: ActiveSurveyComponent, pathMatch: 'full' },
  { path: 'survey/create/:surveyType', component: CreateSurveyComponent, pathMatch: 'full' },
  { path: 'my-details', component: MyDetailsComponent, pathMatch: 'full' },
  { path: 'feedback', component: FeedbackComponent, pathMatch: 'full' },
  { path: 'payment/:surveyId', component: PaymentComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouts),
    HighchartMapModule,
    FormsModule,
    ReactiveFormsModule,
    
    //PiechartModule,
  ],
  
  declarations: [SafePipe,DashboardComponent, CreateSurveyComponent, ActiveSurveyComponent, VisualizationDashboardComponent, MyDetailsComponent, FeedbackComponent, PaymentComponent]
})
export class ClientModule { }
