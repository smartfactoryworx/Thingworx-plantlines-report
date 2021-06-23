import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChartHistory2Component } from './event-chart-history2.component';

describe('EventChartHistory2Component', () => {
  let component: EventChartHistory2Component;
  let fixture: ComponentFixture<EventChartHistory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventChartHistory2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChartHistory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
