import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRespondentFirstSurveyComponent } from './signup-respondent-first-survey.component';

describe('SignupRespondentFirstSurveyComponent', () => {
  let component: SignupRespondentFirstSurveyComponent;
  let fixture: ComponentFixture<SignupRespondentFirstSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupRespondentFirstSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupRespondentFirstSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
