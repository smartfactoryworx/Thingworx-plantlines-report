import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultMasterComponent } from './fault-master.component';

describe('FaultMasterComponent', () => {
  let component: FaultMasterComponent;
  let fixture: ComponentFixture<FaultMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
