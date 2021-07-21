import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultDialogComponent } from './fault-dialog.component';

describe('FaultDialogComponent', () => {
  let component: FaultDialogComponent;
  let fixture: ComponentFixture<FaultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
