import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientProfileComponent } from './profiles/client-profile/client-profile.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";
import { RespondentProfileComponent } from './profiles/respondent-profile/respondent-profile.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SurveyCreateMainComponent } from './survey/survey-create-main/survey-create-main.component';
import { SurveyListClientComponent } from './survey/survey-list-client/survey-list-client.component';
import { SurveyComponent } from './survey/survey/survey.component';
import { SurveyListRespondentComponent } from './survey/survey-list-respondent/survey-list-respondent.component';
import { RespondToSurveyComponent } from './survey/respond-to-survey/respond-to-survey.component';
import { SignupRespondentFirstSurveyComponent } from './signup/signup-respondent-first-survey/signup-respondent-first-survey.component';
import { SurveyEditComponent } from './survey/survey-edit/survey-edit.component';
import { FacebookModule } from 'ngx-facebook';
import { SurveyShortComponent } from './survey/survey-create-main/survey-short/survey-short.component';
import { SurveyParaComponent } from './survey/survey-create-main/survey-para/survey-para.component';
import { SurveyNumberComponent } from './survey/survey-create-main/survey-number/survey-number.component';
import { SurveyTimeComponent } from './survey/survey-create-main/survey-time/survey-time.component';
import { SurveyRadioComponent } from './survey/survey-create-main/survey-radio/survey-radio.component';
import { SurveyCheckboxComponent } from './survey/survey-create-main/survey-checkbox/survey-checkbox.component';
import { SurveyDropboxComponent } from './survey/survey-create-main/survey-dropbox/survey-dropbox.component';
import { SurveyDateComponent } from './survey/survey-create-main/survey-date/survey-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { IntroClientComponent } from './signup/intro-client/intro-client.component';
import { IntroRespondentComponent } from './signup/intro-respondent/intro-respondent.component';
import { SideNavComponent } from './profiles/respondent-profile/side-nav/side-nav.component';
import { RespondentHomeComponent } from './profiles/respondent-profile/respondent-home/respondent-home.component';
import { RespondentFavComponent } from './profiles/respondent-profile/respondent-fav/respondent-fav.component';
import { RespondentHelpComponent } from './profiles/respondent-profile/respondent-help/respondent-help.component';
import { RespondentStatsComponent } from './profiles/respondent-profile/respondent-stats/respondent-stats.component';
import { RespondentUserComponent } from './profiles/respondent-profile/respondent-user/respondent-user.component';
import { ListResponsesComponent } from './survey/list-responses/list-responses.component';
import { ResponseComponent } from './survey/response/response.component';
import { ClientSideNavComponent } from './profiles/client-profile/client-side-nav/client-side-nav.component';
import { ClientHomeComponent } from './profiles/client-profile/client-home/client-home.component';
import { ClientActiveSurveyComponent } from './profiles/client-profile/client-active-survey/client-active-survey.component';
import { ClientFeedbackComponent } from './profiles/client-profile/client-feedback/client-feedback.component';
import { ClientHelpComponent } from './profiles/client-profile/client-help/client-help.component';
import { AdminComponent } from './admin/admin.component';
import { SearchRespondentComponent } from './admin/search-respondent/search-respondent.component';
import { SearchClientComponent } from './admin/search-client/search-client.component';
import { SearchSurveyComponent } from './admin/search-survey/search-survey.component';
import { ClientTemplatesComponent } from './survey/client-templates/client-templates.component';

import { IntroService } from './services/intro/intro.service';
import { SignupRespondentComponent } from './signup/signup-respondent/signup-respondent.component'

import { ClientModule } from './client/client.module';
import { RespondentSurveyComponent } from './profiles/respondent-profile/respondent-survey/respondent-survey.component';
// import { RespondentComponent } from './respondent/respondent/respondent.component';
import { RespondentComponent } from './admin-assign/respondent/respondent.component';
import { AssignSurveyComponent } from './admin-assign/assign-survey/assign-survey.component';
import { CreditPointComponent } from './profiles/respondent-profile/credit-point/credit-point.component';
import { SurveyListComponent } from './admin-assign/survey-list/survey-list.component';
import { ActiveSurveyListComponent } from './admin-assign/active-survey-list/active-survey-list.component';
import {AdminRespondentProfileComponent} from './admin-assign/respondent-profile/admin-respondent-profile.component';
import { SurveyQuoteComponent } from './signup/survey-quote/survey-quote.component';
import { ReportsComponent } from './admin-assign/reports/reports.component';
// import { SafePipe } from './safe.pipe';

const appRoutes: Routes = [
  { path: 'client', loadChildren: "./client/client.module#ClientModule" },
  { path: '', component: HomePageComponent },
  { path: 'signup/respondent/firstSurvey', component: SignupRespondentFirstSurveyComponent },
  { path: 'respondent/intro', component: IntroRespondentComponent },
  { path: 'respondent/profile', component: RespondentProfileComponent, data: { title: 'My Calendar' } },
  { path: 'respondent/fav', component: RespondentProfileComponent },
  { path: 'respondent/stats', component: RespondentProfileComponent },
  { path: 'respondent/help', component: RespondentProfileComponent },
  { path: 'respondent/signup', component: SignupRespondentComponent },
  { path: 'respondent/point', component: CreditPointComponent },

  { path: 'respondent/:id/listSurveys', component: SurveyListRespondentComponent },
  { path: 'respondent/respondToSurvey/:surveyId', component: RespondToSurveyComponent },
  { path: 'client/intro', component: IntroClientComponent },
  { path: 'client/profile', component: ClientProfileComponent, data: { title: 'My Calendar' } },
  { path: 'client/profile/:flag', component: ClientProfileComponent },
  { path: 'client/activeSurvey', component: ClientProfileComponent },
  { path: 'feedback', component: ClientProfileComponent },
  { path: 'client/help', component: ClientProfileComponent },
  { path: 'client/estimate', component: SurveyQuoteComponent },
  { path: 'client/estimate/:type', component: SurveyQuoteComponent },
  { path: 'client/estimate/:type/:head', component: SurveyQuoteComponent },
  { path: 'client/createSurvey/:template', component: SurveyCreateMainComponent },
  { path: 'client/createSurvey/:template/:cost/:head', component: SurveyCreateMainComponent },
  { path: 'client/:id/listSurveys', component: SurveyListClientComponent },
  { path: 'client/:id/templates/:template', component: ClientTemplatesComponent },
  { path: 'survey/:surveyId', component: SurveyComponent },
  { path: 'survey/:surveyId/edit', component: SurveyEditComponent },
  { path: 'survey/:surveyId/listResponses', component: ListResponsesComponent },
  { path: 'response/:responseId', component: ResponseComponent },
  { path: 'client/updateSurvey/:template/:id', component: SurveyCreateMainComponent },
  { path: 'client/updateSurvey/:template/:cost/:id', component: SurveyCreateMainComponent },
  { path: 'super/search/profile/:user_id', component: AdminRespondentProfileComponent },
  { path: 'respondent/survey/:surveyId', component: RespondentSurveyComponent },
  { path: 'super/client/survey/list', component: RespondentComponent },
  { path: 'super/survey/assign/:surveyId', component: AssignSurveyComponent },
  { path: 'super/survey/list', component: SurveyListComponent },
  { path: 'super/survey/report', component: ReportsComponent },
  { path: 'super/survey/list/:flag', component: SurveyListComponent },
  { path: 'super/active/list', component: ActiveSurveyListComponent },
  { path: '**', redirectTo: "", pathMatch: "full" },
]
@NgModule({
  declarations: [
    AppComponent,
    ClientProfileComponent,
    RespondentProfileComponent,
    HomePageComponent,
    SurveyCreateMainComponent,
    SurveyListClientComponent,
    SurveyComponent,
    SurveyListRespondentComponent,
    RespondToSurveyComponent,
    SignupRespondentFirstSurveyComponent,
    SurveyEditComponent,
    SurveyShortComponent,
    SurveyParaComponent,
    SurveyNumberComponent,
    SurveyTimeComponent,
    SurveyRadioComponent,
    SurveyCheckboxComponent,
    SurveyDropboxComponent,
    SurveyDateComponent,
    HeaderComponent,
    IntroClientComponent,
    IntroRespondentComponent,
    SideNavComponent,
    AdminRespondentProfileComponent,
    RespondentHomeComponent,
    RespondentFavComponent,
    RespondentHelpComponent,
    RespondentStatsComponent,
    RespondentUserComponent,
    ListResponsesComponent,
    ResponseComponent,
    ClientSideNavComponent,
    ClientHomeComponent,
    ClientActiveSurveyComponent,
    ClientFeedbackComponent,
    ClientHelpComponent,
    AdminComponent,
    SearchRespondentComponent,
    SearchClientComponent,
    SearchSurveyComponent,
    ClientTemplatesComponent,
    SignupRespondentComponent,
    RespondentSurveyComponent,
    RespondentComponent,
    AssignSurveyComponent,
    CreditPointComponent,
    SurveyListComponent,
    ActiveSurveyListComponent,
    SurveyQuoteComponent,
    ReportsComponent,
    // SafePipe,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FacebookModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ClientModule,
    // MatExpansionModule
  ],
  providers: [
    IntroService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
