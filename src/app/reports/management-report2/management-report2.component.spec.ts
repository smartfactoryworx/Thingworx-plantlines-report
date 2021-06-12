import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementReport2Component } from './management-report2.component';

describe('ManagementReport2Component', () => {
  let component: ManagementReport2Component;
  let fixture: ComponentFixture<ManagementReport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementReport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
