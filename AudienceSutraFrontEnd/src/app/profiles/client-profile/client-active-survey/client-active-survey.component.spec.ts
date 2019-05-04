import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientActiveSurveyComponent } from './client-active-survey.component';

describe('ClientActiveSurveyComponent', () => {
  let component: ClientActiveSurveyComponent;
  let fixture: ComponentFixture<ClientActiveSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientActiveSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientActiveSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
