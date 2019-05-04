import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTimeComponent } from './survey-time.component';

describe('SurveyTimeComponent', () => {
  let component: SurveyTimeComponent;
  let fixture: ComponentFixture<SurveyTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
