import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListRespondentComponent } from './survey-list-respondent.component';

describe('SurveyListRespondentComponent', () => {
  let component: SurveyListRespondentComponent;
  let fixture: ComponentFixture<SurveyListRespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListRespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListRespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
