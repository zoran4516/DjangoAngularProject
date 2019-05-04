import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSurveyListComponent } from './active-survey-list.component';

describe('ActiveSurveyListComponent', () => {
  let component: ActiveSurveyListComponent;
  let fixture: ComponentFixture<ActiveSurveyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSurveyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
