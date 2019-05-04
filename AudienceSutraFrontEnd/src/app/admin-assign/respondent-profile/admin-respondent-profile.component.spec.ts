import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespondentProfileComponent } from './admin-respondent-profile.component';

describe('AdminRespondentProfileComponent', () => {
  let component: AdminRespondentProfileComponent;
  let fixture: ComponentFixture<AdminRespondentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRespondentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRespondentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
