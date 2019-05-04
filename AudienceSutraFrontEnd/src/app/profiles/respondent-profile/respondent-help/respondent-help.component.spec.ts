import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentHelpComponent } from './respondent-help.component';

describe('RespondentHelpComponent', () => {
  let component: RespondentHelpComponent;
  let fixture: ComponentFixture<RespondentHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
