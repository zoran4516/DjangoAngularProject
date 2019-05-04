import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRespondentComponent } from './search-respondent.component';

describe('SearchRespondentComponent', () => {
  let component: SearchRespondentComponent;
  let fixture: ComponentFixture<SearchRespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
