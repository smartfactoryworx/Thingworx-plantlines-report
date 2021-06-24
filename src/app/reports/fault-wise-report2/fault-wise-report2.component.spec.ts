import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultWiseReport2Component } from './fault-wise-report2.component';

describe('FaultWiseReport2Component', () => {
  let component: FaultWiseReport2Component;
  let fixture: ComponentFixture<FaultWiseReport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultWiseReport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultWiseReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
