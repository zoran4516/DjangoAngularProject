import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentHomeComponent } from './respondent-home.component';

describe('RespondentHomeComponent', () => {
  let component: RespondentHomeComponent;
  let fixture: ComponentFixture<RespondentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
