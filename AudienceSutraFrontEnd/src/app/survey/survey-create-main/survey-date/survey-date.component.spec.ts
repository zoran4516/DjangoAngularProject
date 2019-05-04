import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDateComponent } from './survey-date.component';

describe('SurveyDateComponent', () => {
  let component: SurveyDateComponent;
  let fixture: ComponentFixture<SurveyDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
