import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultCauseComponent } from './fault-cause.component';

describe('FaultCauseComponent', () => {
  let component: FaultCauseComponent;
  let fixture: ComponentFixture<FaultCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultCauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
