import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentFavComponent } from './respondent-fav.component';

describe('RespondentFavComponent', () => {
  let component: RespondentFavComponent;
  let fixture: ComponentFixture<RespondentFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
