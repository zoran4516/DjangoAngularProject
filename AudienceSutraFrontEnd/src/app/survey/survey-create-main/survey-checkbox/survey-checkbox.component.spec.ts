import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCheckboxComponent } from './survey-checkbox.component';

describe('SurveyCheckboxComponent', () => {
  let component: SurveyCheckboxComponent;
  let fixture: ComponentFixture<SurveyCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
