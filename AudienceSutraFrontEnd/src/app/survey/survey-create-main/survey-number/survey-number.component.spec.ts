import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyNumberComponent } from './survey-number.component';

describe('SurveyNumberComponent', () => {
  let component: SurveyNumberComponent;
  let fixture: ComponentFixture<SurveyNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
