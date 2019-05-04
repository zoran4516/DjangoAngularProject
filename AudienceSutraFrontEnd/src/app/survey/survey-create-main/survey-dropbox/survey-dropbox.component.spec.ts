import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDropboxComponent } from './survey-dropbox.component';

describe('SurveyDropboxComponent', () => {
  let component: SurveyDropboxComponent;
  let fixture: ComponentFixture<SurveyDropboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDropboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDropboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
