import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroClientComponent } from './intro-client.component';

describe('IntroClientComponent', () => {
  let component: IntroClientComponent;
  let fixture: ComponentFixture<IntroClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
