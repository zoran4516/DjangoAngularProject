import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondToSurveyComponent } from './respond-to-survey.component';

describe('RespondToSurveyComponent', () => {
  let component: RespondToSurveyComponent;
  let fixture: ComponentFixture<RespondToSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondToSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondToSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
