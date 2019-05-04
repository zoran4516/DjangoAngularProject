import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResponsesComponent } from './list-responses.component';

describe('ListResponsesComponent', () => {
  let component: ListResponsesComponent;
  let fixture: ComponentFixture<ListResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
