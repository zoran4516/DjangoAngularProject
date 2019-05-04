import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroRespondentComponent } from './intro-respondent.component';

describe('IntroRespondentComponent', () => {
  let component: IntroRespondentComponent;
  let fixture: ComponentFixture<IntroRespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroRespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroRespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
