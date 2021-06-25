import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTempReportComponent } from './current-temp-report.component';

describe('CurrentTempReportComponent', () => {
  let component: CurrentTempReportComponent;
  let fixture: ComponentFixture<CurrentTempReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTempReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTempReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
