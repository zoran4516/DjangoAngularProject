import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentSurveyComponent } from './respondent-survey.component';

describe('RespondentSurveyComponent', () => {
  let component: RespondentSurveyComponent;
  let fixture: ComponentFixture<RespondentSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
