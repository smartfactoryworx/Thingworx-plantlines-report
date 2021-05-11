import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywiseReportComponent } from './daywise-report.component';

describe('DaywiseReportComponent', () => {
  let component: DaywiseReportComponent;
  let fixture: ComponentFixture<DaywiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaywiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaywiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
