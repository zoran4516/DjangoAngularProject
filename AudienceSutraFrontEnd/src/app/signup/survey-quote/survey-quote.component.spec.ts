import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuoteComponent } from './survey-quote.component';

describe('SurveyQuoteComponent', () => {
  let component: SurveyQuoteComponent;
  let fixture: ComponentFixture<SurveyQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
