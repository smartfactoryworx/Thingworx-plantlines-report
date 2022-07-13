import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleReportOldComponent } from './cycle-report-old.component';


describe('CycleReportOldComponent', () => {
  let component: CycleReportOldComponent;
  let fixture: ComponentFixture<CycleReportOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleReportOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleReportOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
