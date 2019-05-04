import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyParaComponent } from './survey-para.component';

describe('SurveyParaComponent', () => {
  let component: SurveyParaComponent;
  let fixture: ComponentFixture<SurveyParaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyParaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
