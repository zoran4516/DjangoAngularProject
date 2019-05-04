import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartMapComponent } from './highchart-map.component';

describe('HighchartMapComponent', () => {
  let component: HighchartMapComponent;
  let fixture: ComponentFixture<HighchartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
