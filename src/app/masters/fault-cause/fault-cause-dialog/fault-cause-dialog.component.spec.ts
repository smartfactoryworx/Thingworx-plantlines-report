import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultCauseDialogComponent } from './fault-cause-dialog.component';

describe('FaultCauseDialogComponent', () => {
  let component: FaultCauseDialogComponent;
  let fixture: ComponentFixture<FaultCauseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultCauseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultCauseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
