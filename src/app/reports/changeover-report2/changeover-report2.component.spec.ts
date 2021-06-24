import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeoverReport2Component } from './changeover-report2.component';

describe('ChangeoverReport2Component', () => {
  let component: ChangeoverReport2Component;
  let fixture: ComponentFixture<ChangeoverReport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeoverReport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeoverReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
