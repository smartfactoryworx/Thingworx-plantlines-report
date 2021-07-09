import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleReportComponent } from './cycle-report.component';

describe('CycleReportComponent', () => {
  let component: CycleReportComponent;
  let fixture: ComponentFixture<CycleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
