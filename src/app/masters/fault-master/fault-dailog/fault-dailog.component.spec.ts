import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultDailogComponent } from './fault-dailog.component';

describe('FaultDailogComponent', () => {
  let component: FaultDailogComponent;
  let fixture: ComponentFixture<FaultDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
