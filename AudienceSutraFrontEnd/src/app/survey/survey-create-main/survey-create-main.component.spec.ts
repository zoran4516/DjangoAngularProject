import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreateMainComponent } from './survey-create-main.component';

describe('SurveyCreateMainComponent', () => {
  let component: SurveyCreateMainComponent;
  let fixture: ComponentFixture<SurveyCreateMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCreateMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCreateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
