import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentStatsComponent } from './respondent-stats.component';

describe('RespondentStatsComponent', () => {
  let component: RespondentStatsComponent;
  let fixture: ComponentFixture<RespondentStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
