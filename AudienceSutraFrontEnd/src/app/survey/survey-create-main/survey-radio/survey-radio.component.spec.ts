import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRadioComponent } from './survey-radio.component';

describe('SurveyRadioComponent', () => {
  let component: SurveyRadioComponent;
  let fixture: ComponentFixture<SurveyRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
