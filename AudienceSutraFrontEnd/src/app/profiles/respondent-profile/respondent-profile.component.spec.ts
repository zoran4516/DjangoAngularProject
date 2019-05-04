import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentProfileComponent } from './respondent-profile.component';

describe('RespondentProfileComponent', () => {
  let component: RespondentProfileComponent;
  let fixture: ComponentFixture<RespondentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
