import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentUserComponent } from './respondent-user.component';

describe('RespondentUserComponent', () => {
  let component: RespondentUserComponent;
  let fixture: ComponentFixture<RespondentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
