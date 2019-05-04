import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyShortComponent } from './survey-short.component';

describe('SurveyShortComponent', () => {
  let component: SurveyShortComponent;
  let fixture: ComponentFixture<SurveyShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
